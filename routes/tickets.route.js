var express = require('express');
var router = express.Router();
var ticketModel = require('../models/ticket.model');
var userModel = require('../models/user.model');

router.get('/', function (request, response) {
  console.log(prueba);
  ticketModel.find({
    deleted: false,
    username: request.headers['username-ticket'],
    date: { $gte:request.headers['datema-ticket'], $lte: request.headers['dateme-ticket']}
  }, {
    _id:0,
    deleted: 0,
    __v: 0
  }, null, function (err, ticketList) {
    if (err) {
      return response.status(500).send({
        message: 'Thera was a problem retrieving the ticket list',
        error: err
      });
    } else {
      response.send({
        message: 'The ticketList has been retrieved',
        data: ticketList
      });
    }
  });
});



router.post('/', function (request, response) {
  var newTicket = new ticketModel(request.body);
  var prueba = "prueba variables globales";
  newTicket.save(function (err, ticketCreated) {
    if (err) {
      return response.status(500)
        .send({
          message: 'There was a problem registering the ticket',
          error: err
        });
    } else {
      response.send({
        message: 'A new ticket has been created',
        data: ticketCreated
      });
    }
  });
});

router.put('/', function (request, response) {
    ticketModel.findOne({
    username: request.headers['username-ticket'],
    date: request.headers['date-ticket']
  }, function (err, ticketFound) {
    if (err)
      return response.status(500).send({
        message: 'There was a problem to find the ticket, error server',
        error: err
      });
    if (!ticketFound)
      return response.status(404).send({
        message: 'There was a problem to find the ticket, invalid username or date',
        error: ''
      });
    ticketFound.schedule = ticketFound.schedule.concat(request.body);
    var newTicket = new ticketModel(ticketFound); 
    newTicket.save(function (error, ticketUpdate){
      if(error)
          return response.status(500).send({
          message:'There was a problem to update the ticket, error server',
          error: error
          });
      response.send({
          message: 'The ticket has been updated',
          data: ticketUpdate
      });
  }); 
  });
});

module.exports = router;