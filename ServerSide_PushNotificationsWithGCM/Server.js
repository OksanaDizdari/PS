/**
 * Created by beatr_000 on 01/02/2015.
 */
// BASE SETUP
// ==============================================
var express = require('express')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8080;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES
// ==============================================
// we'll create our routes here

require('./routes/')(app);
require('./routes/clients')(app);
require('./routes/clients/users')(app);
require('./routes/clients/users/devices')(app);


// ERROR
//===============================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            title: 'Error',
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        title: 'Error',
        message: err.message,
        error: {}
    });
});

module.exports = app;
// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);

