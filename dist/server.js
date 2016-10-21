'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(),
    port = 3000;

app.get('/', function (req, res) {
    res.send('Running');
});

app.listen(port, 'localhost', function () {
    console.log('The server is listening to port ' + port);
});