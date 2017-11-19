const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
  username: {
    type: String
  },
  userTasks: {
    type: Array,
    default: []
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.addUser = (newUser, callback) => {
    User.create(newUser, callback);
}

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
}
module.exports.getUsers = function (callback) {
    User.find(callback);
}