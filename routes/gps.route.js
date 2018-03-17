var express = require('express');
var router = express.Router();
var gpsModel = require('../models/gps.model');
var userModel = require('../models/user.model');

router.get('/', function (request, response) {
  gpsModel.find({
    deleted: false,
    username: request.headers['username'],
    date: { $gte:request.headers['dateme'], $lte: request.headers['datema']}
  }, {
    _id:0,
    deleted: 0,
    __v: 0
  }, null, function (err, gpsList) {
    if (err) {
      return response.status(500).send({
        message: 'Thera was a problem retrieving the gps list',
        error: err
      });
    } else {
      response.send({
        message: 'The gpsList has been retrieved',
        data: gpsList
      });
    }
  });
});



router.post('/', function (request, response) {
  var newGps = new gpsModel(request.body);
  newGps.save(function (err, gpsCreated) {
    if (err) {
      return response.status(500)
        .send({
          message: 'There was a problem registering the gps',
          error: err
        });
    } else {
      response.send({
        message: 'A new gps has been created',
        data: gpsCreated
      });
    }
  });
});

router.put('/', function (request, response) {
    gpsModel.findOne({
    username: request.headers['username'],
    date: request.headers['date']
  }, function (err, gpsFound) {
    if (err)
      return response.status(500).send({
        message: 'There was a problem to find the gps, error server',
        error: err
      });
    if (!gpsFound)
      return response.status(404).send({
        message: 'There was a problem to find the gps, invalid username or date',
        error: ''
      });
    gpsFound.schedule = gpsFound.schedule.concat(request.body);
    var newGps = new gpsModel(gpsFound); 
    newTicket.save(function (error, gpsUpdate){
      if(error)
          return response.status(500).send({
          message:'There was a problem to update the gps, error server',
          error: error
          });
      response.send({
          message: 'The gps has been updated',
          data: gpsUpdate
      });
  }); 
  });
});

module.exports = router;