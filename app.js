// dependencies
var express = require('express');
var app = express();
var morgan = require('morgan');
var path  = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var appRoutesMongo = require('./server/routes/apiMongoose');

// to log the routes with statuses in the terminal 
app.use(morgan('dev'));

// to parse the incoming data in req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serving static files from views directory
app.use(express.static(__dirname + '/views'));


app.use('/apiMongo', appRoutesMongo);

// path to store data locally
mongoose.connect('mongodb://rahul1463:Saroj#1463@ds147480.mlab.com:47480/quezx_app', {
    useMongoClient: true
});

// default routing, even if user tampers with path, it will be directed to index.html
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

// making the app listen to port 3500 or if hosted at cloud will use env var
app.listen(process.env.PORT || 5000, function () {
    console.log('Server started');
});