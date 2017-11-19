const express = require('express');
const router = express.Router();
const User = require('../models/user');

// register new user
router.post('/register', (req, res, next) => {
    if (req.body.username) {
        //create new user object
        let newUser = new User({
            username: req.body.username,
            userTasks: [],
        });
        User.addUser(newUser, (err, user) => {
            if (err) {
                res.json({ success: false, msg: 'Failed to register user' });
            } else {
                res.json({ success: true, msg: 'User registered' });
            }
        });
    } else {
        var err = new Error('Username is required.');
        err.status = 400;
        return next(err);
    }
});

// load all users
router.get('/getUsers', (req, res) => {
    User.getUsers((err, users) => {
        if (err) throw err;
        res.json(users);
    });
});

//updates user.tasks
router.put('/updateTasks/:id', function (req, res, next) {
    User.update({ _id: req.params.id }, { $set: { userTasks: req.body.userTasks } }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
module.exports = router;