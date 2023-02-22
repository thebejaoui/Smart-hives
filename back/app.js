var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://adresse_IP_du_broker_MQTT:1883');


client.subscribe('esp32_topic', function (err) {
  if (err) {
    console.log('Erreur lors de l\'abonnement au topic', err)
  } else {
    console.log('Abonnement au topic esp32_topic réussi')
  }
})

client.publish('esp32_topic', 'Bonjour depuis Node.js')


client.on('message', function (topic, message) {
  console.log('Message reçu sur le topic', topic, ':', message.toString())
})








var rucheRouter = require('./routes/ruche');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');





var config =require('./database/config.json');
var mongoose = require('mongoose');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/ruche',rucheRouter );


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const connect = mongoose.connect(config.mongo.uri, {
  useNewUrlParser: true , 
  useUnifiedTopology: true
}, () => console.log('Connected to the database !'));

module.exports = app;
