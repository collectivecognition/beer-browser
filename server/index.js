var express = require('express');
var path = require('path');
var app = express();
var bodyparser = require('body-parser');
var gutil = require('gulp-util');
var config = require('../config');

app.use('/', express.static(path.join(__dirname, '..', 'build')));

var server = app.listen(config.server.port, function() {
	gutil.log('Server running on http://' + server.address().address + ':' + server.address().port);
});

app.use(bodyparser.json());