const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TasksSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    worker: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Tasks = mongoose.model('Tasks', TasksSchema);