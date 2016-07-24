var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var webLogger = require('morgan');
var logger = require(__common + '/tools/logger')('app');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var startup = require('./startup.js');

var app = express();

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));
app.use(webLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

///Compression and minifications
if (app.get('env') === 'development') {} else {
    var compression = require('compression');
    var minify = require('express-minify');
    app.use(compression());
    app.use(minify({ cache: path.join(__dirname, 'cache') }));
}

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/vendor', express.static(path.join(__dirname, 'vendor')));

var authenticator = require('./tools/authenticator');
// app.use(authenticator.midleware);

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
var settings = require('./tools/settings');
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        logger.error(err);
        res.status(err.status || 500);
        res.render('error', settings.extended(req, {
            user: {
                isAuthenticated: false
            },
            exception: {
                message: err.message,
                error: err
            }
        }));
    });
} else {
    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        logger.error(err);
        res.status(err.status || 500);
        res.render('error', settings.extended(req, {
            user: {
                isAuthenticated: false
            },
            exception: {
                message: err.message,
                error: {}
            }
        }));
    });
}

module.exports = function() {
    var debug = require('debug')('app:server');
    var http = require('http');

    var port = normalizePort(__env.PORT || '3000');
    app.set('port', port);

    var server = http.createServer(app);

    var io = require('socket.io')(server);

    io.on('connection', function(socket) {
        console.log('a user connected');
        socket.on('disconnect', function() {
            console.log('user disconnected');
        });

        // socket.on('pause', function (id) {
        // 	console.log('group: ', id);
        // 	io.emit('pause', id);
        // });

        socket.on('play.melody', function(melody) {
            console.log('play.melody: ', melody);
            io.emit('play.melody', melody);
            io.emit('answer.alow', true);
        });

        socket.on('disable.melody', function(melody) {
            console.log('disable.melody: ', melody);
            io.emit('disable.melody', melody);
            io.emit('disable.melody', true);
        });

        socket.on('players.update', function(players) {
            console.log('players.update: ', players);
            io.emit('players.update', players);
        });

        socket.on('pause.all.melody', function() {
            io.emit('pause.melody');
        });

        socket.on('stop.all.melody', function() {
            io.emit('stop.melody');
        });

        socket.on('answer', function(team) {
            console.log('answer: ', team);
            team.answerTime = new Date();
            io.emit('answer', team);
            io.emit('answer.alow', false);
            io.emit('pause.melody');
        });
    });



    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    function normalizePort(val) {
        var port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    function onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }

    startup();

    return app;
};