const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// delete task
router.delete('/deleteTask/:id', function (req, res, next) {
    Task.deleteTask({ _id: req.params.id }, function (err) {
        if (err) return next(err);
    });
});

// add task
router.post('/addTask', (req, res, next) => {
    let newTask = new Task({
        _id: req.body._id,
        details: req.body.details,
    });
    Task.addTask(newTask, (err, task) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add task' });
        } else {
            res.json({ success: true, msg: 'Task added' });
        }
    });
});

// load all tasks
router.get('/getTasks', (req, res) => {
    Task.getTasks((err, tasks) => {
        if (err) throw err;
        res.json(tasks);
    });
});

module.exports = router;