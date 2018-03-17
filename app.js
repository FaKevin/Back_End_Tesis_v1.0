var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
/*Routes declaration*/
/*test*/
var usersRoute = require('./routes/users.route');
var ticketRoutes = require('./routes/tickets.route');
var gpsRoutes = require('./routes/gps.route');
var authRoute = require('./routes/auth.route');

var app = express();

app.use(function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETED');
  response.header('Access-Control-Allow-Headers', 
  'Origin, X-Requested-With, Content_type, Content-Type, Accept, auth-access-token, date,datema,dateme, username');
  next();
});

mongoose.connect('mongodb://localhost/tesis');

mongoose.connection.on('error', function () {
  console.log('error..............');
});

mongoose.connection.once('open', function () {
  console.log('We are conected to mongodb ;)');
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
/*Add routes to app*/
app.use('/users', usersRoute);
app.use('/auth', authRoute);
app.use('/tickets', ticketRoutes);
app.use('/gps', gpsRoutes);

app.listen(3000, function () {
  console.log('corriendo en el puerto 3000');
});
