var express = require('express');
var router = express.Router();
var userModel = require('../models/user.model');
var bcrypt = require('bcryptjs');
var secretkeys = require('../secret.keys');
var verifyTokenMiddleware = require('../auth/verifyTokenMiddleware');

var updateMiddleware = function (request, response, next) {
  if (request.body.deleted) {
    return response.status(403).send({
      message: "No debes tratar de actualizar este campo"
    });
  } else {
    next();
  }
};

var updateMiddleware2 = function (request, response, next) {
  delete request.body.password;
  delete request.body.type;
  delete request.body.deleted;
  next();
};

var admmiddleware = function (request, response, next) {
  if (request.params.type === 'USER') {
    return response.status(403).send({
      message: 'No eres administrador y no puedes crear un usuario',
      data: null
    });
  }
  next();
}

router.get('/', function (request, response) {
  console.log('headers-->', request.headers);
  userModel.find({
    deleted: false
  }, {
    _id:0,
   password: 0,
    deleted: 0,
    __v: 0
  }, null, function (err, userList) {
    if (err) {
      return response.status(500).send({
        message: 'Thera was a problem retrieving the user list',
        error: err
      });
    } else {
      response.send({
        message: 'The userlist has been retrieved',
        data: userList
      });
    }
  });
});

router.post('/', function (request, response) {
  var newUser = new userModel(request.body);
  if (request.body.password) {
    var hashedPassword = bcrypt.hashSync(request.body.password, secretkeys.salts);
    newUser.password = hashedPassword;
  }
  newUser.save(function (err, userCreated) {
    if (err) {
      return response.status(500)
        .send({
          message: 'There was a problem registering ther user',
          error: err
        });
    } else {
      userCreated.speak();
      response.send({
        message: 'A new user has been created',
        data: userCreated.getDtoUser()
      });
    }

  });
});

router.put('/:username', function (request, response) {
  userModel.findOne({
    username: request.params.username,
    deleted: false
  }, function (err, userFound) {
    if (err)
      return response.status(500).send({
        message: 'There was a problem to find the user, error server',
        error: err
      });
    if (!userFound)
      return response.status(404).send({
        message: 'There was a problem to find the user, invalid username',
        error: ''
      });
    for (var propiedad in request.body)
      userFound[propiedad] = request.body[propiedad];
    userFound.save(function (error, userUpdated) {
      if (error)
        return response.status(500).send({
          message: 'Thera was a problem to update the user, error serve',
          error: error
        });
      response.send({
        message: 'The user has been updated',
        data: userUpdated.getDtoUser()
      });
    });
  });
});

router.delete('/:username', function (request, response) {
  userModel.findOne({
    username: request.params.username,
    deleted: false
  }, function (err, userFound) {
    if (err)
      return response.status(500).send({
        message: 'There was a problem to delete the user, error server',
        error: err
      });
    if (!userFound)
      return response.status(404).send({
        message: 'There was a problem to get the user(invalid username)',
        error: ''
      });

    userFound.deleted = true;

    userFound.save(function (error, userUpdated) {
      if (error)
        return response.status(500).send({
          message: 'There was a problem to delete the user, error server',
          error: error
        });
      response.send({
        message: 'The user has been deleted',
        data: userUpdated.getDtoUser()
      });
    });
  });
});

router.get('/:username', function (request, response) {
  userModel.findOne({
    username: request.params.username,
    deleted: false
  }, {
    __v: 0,
    password: 0,
    deleted: 0
  }, null, function (err, userFound) {
    if (err)
      return response.status(500).send({
        message: 'There was a problem to find the user, server error',
        error: err
      });
    if (!userFound)
      return response.status(404).send({
        message: 'There was a proble to find the user, invalid username',
        error: ''
      });

    response.send({
      message: 'User retrieved',
      data: userFound
    });
  });
});

module.exports = router;
