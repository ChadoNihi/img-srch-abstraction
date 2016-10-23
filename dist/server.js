'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _main = require('./routes/main.js');

var _stylus = require('stylus');

var _stylus2 = _interopRequireDefault(_stylus);

var _nib = require('nib');

var _nib2 = _interopRequireDefault(_nib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(),
    port = process.env.PORT || 5000,
    compile = function compile(str, path) {
    return (0, _stylus2.default)(str).set('filename', path).use((0, _nib2.default)());
};

_dotenv2.default.config();
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(_stylus2.default.middleware({ src: __dirname + '/public',
    compile: compile
}));
app.use(_express2.default.static(__dirname + '/public'));

app.get('/', _main.showMainPage);
app.get('/' + _main.imgSrchPath, _main.returnBySearch);
app.get('/' + _main.latestPath, _main.returnLatest);

app.listen(app.get('port'), function () {
    console.log('The server is listening to port ' + app.get('port'));
});