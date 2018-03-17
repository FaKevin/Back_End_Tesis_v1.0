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
  location: [],
  deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Gps', userSchema);