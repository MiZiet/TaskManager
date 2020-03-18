const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");

const app = express();
app.use(express.json());

const db = config.get("mongoURI");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected.."))
  .catch(err => console.log(err));

app.use("/api/workers", require("./routes/api/workers"));
app.use("/api/tasks", require("./routes/api/tasks"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
