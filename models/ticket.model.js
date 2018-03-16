var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    unique: true,
    //trim: true
  },
  schedule: [],
  deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Ticket', userSchema);