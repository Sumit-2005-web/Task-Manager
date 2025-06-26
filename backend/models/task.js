const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: String,
    desc: String,
    assignedTo: String,
    taskStatus: {
        type: String,
        enum: [
            "To Do",
            "In Progress",
            "Done"
        ]
    } 
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;