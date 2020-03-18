const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    }

});

module.exports = Workers = mongoose.model('Workers', WorkersSchema);
