var express = require('express');
var router = express.Router();
var ticketModel = require('../models/ticket.model');
var userModel = require('../models/user.model');

var selectUserPopulated = {
  path: 'username',
  select: '-_id -username -photo -type -deleted -password -__v'
};

router.post('/', function (request, response) {
  var newTicket = new ticketModel(request.body);
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
    title: request.headers['title-ticket']
  }, function (err, ticketFound) {
    if (err)
      return response.status(500).send({
        message: 'There was a problem to find the ticket, error server',
        error: err
      });
    if (!ticketFound)
      return response.status(404).send({
        message: 'There was a problem to find the ticket, invalid username or tittle',
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