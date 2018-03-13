var mongoose = require('mongoose');
/*https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax*/

var validateemail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

var userSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  contrasena: {
    type: String,
    required: true
  },
  foto: {
    type: String,
    default: 'http://fotouser.miarroba.st/68731257/300/mr-anonimo.jpg'
  },
  departamento: {
    type: String,
    required: true
  },
  ciudad: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  marca: {
    type: String,
    required: true
  },
  ano: {
    type: String,
    required: true
  },
  modelo: {
    type: String,
    required: true
  },
  tipo: {
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
    nombre: this.nombre,
    apellido: this.apellido,
    username : this.username,
    departamento: this.departamento,
    ciudad: this.ciudad,
    direccion: this.direccion,
    marca: this.marca,
    ano: this.ano,
    modelo: this.modelo,
    type: this.type
  };
  return userDTO;
};

module.exports = mongoose.model('User', userSchema);