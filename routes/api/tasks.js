const express = require("express");
const router = express.Router();

const Tasks = require("../../models/tasks");

router.get("/", (req, res) => {
  Tasks.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json("Error:" + err));
});
router.post("/", (req, res) => {
  const newTask = new Tasks({
    name: req.body.name,
    worker: req.body.worker,
    deadline: req.body.deadline,
    done: req.body.done
  });
  newTask
    .save()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json("Error: " + err));
});
router.delete("/:id", (req, res) => {
  Tasks.findById(req.params.id)
    .then(tasks => tasks.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});
router.post("/update/:id", (req, res) => {
  Tasks.findById(req.params.id)
    .then(tasks => {
      tasks.done = true;

      tasks
        .save()
        .then(() => res.json("Task updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
