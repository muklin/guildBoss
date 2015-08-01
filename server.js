var express = require('express');
var app     = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));



//Using a lot of the content from: 
// https://scotch.io/tutorials/easy-node-authentication-setup-and-local

var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session      = require('express-session');

var configDB = require('./app/config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

// parse application/json
app.use(bodyParser.json());

require('./app/config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

require('./app/routes/AppModuleRoutes.js')(app, mongoose);
require('./app/routes/LoginModuleRoutes.js')(app, passport, mongoose);
require('./app/routes/GuildModuleRoutes.js')(app, mongoose);

// required for passport
app.use(session({ secret: 'be careful of children on the road' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.listen(port);
console.log('Magic happens on 3000');
