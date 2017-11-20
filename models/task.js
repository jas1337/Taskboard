const mongoose = require('mongoose');

// Task Schema
const TaskSchema = mongoose.Schema({
    details: {
        type: String,
        required: true
    },
});

const Task = module.exports = mongoose.model('Task', TaskSchema);

module.exports.addTask = (newTask, callback) => {
    Task.create(newTask, callback);
}

module.exports.getTasks = function (callback) {
    Task.find(callback);
}

module.exports.deleteTask = function (id, callback) {
    Task.findById(id, callback).remove().exec();
}
