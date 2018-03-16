var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  num: {
    type: String,
    required: true
  },
  schedule: [],
  deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Ticket', userSchema);