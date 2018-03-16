var mongoose = require('mongoose');
/*https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax*/

var validateemail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  photo: {
    type: String,
    default: 'http://fotouser.miarroba.st/68731257/300/mr-anonimo.jpg'
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['USER', 'ADM'],
    default: 'USER'
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.speak = function () {
  console.log('Hi my name is : ' + this.nombre + this.apellido);
};

userSchema.methods.getDtoUser = function () {
  var userDTO = {
    _id: this._id,
    name: this.name,
    lastname: this.lastname,
    username: this.username,
    state: this.state,
    city: this.city,
    address: this.address,
    brand: this.brand,
    year: this.year,
    model: this.model,
    type: this.type
  };
  return userDTO;
};

module.exports = mongoose.model('User', userSchema);