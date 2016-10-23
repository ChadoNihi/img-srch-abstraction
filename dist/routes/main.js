'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.returnLatest = exports.returnBySearch = exports.showMainPage = exports.latestPath = exports.imgSrchPath = undefined;

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var latestQ = 'factory%20farming',
    ajaxOptions = {
  headers: {
    'Content-Type': 'application/json'
  },
  hostname: 'www.googleapis.com',
  json: true
};

var imgSrchPath = exports.imgSrchPath = 'image-search',
    latestPath = exports.latestPath = imgSrchPath + '/latest',
    showMainPage = exports.showMainPage = function showMainPage(req, res) {
  var url = req.protocol + '://' + req.get('host') + req.originalUrl;

  res.render('index', { url: url,
    title: 'Instructions | JSON Image Search',
    imgSrchPath: imgSrchPath,
    latestPath: latestPath,
    latestQ: latestQ
  });
},
    returnBySearch = exports.returnBySearch = function returnBySearch(req, res) {
  ajaxOptions.path = '/customsearch/v1?q=nuts&cx=' + process.env.CX + '&searchType=image&key=' + process.env.SEARCH_KEY;
  ajaxOptions.path += '&q=' + latestQ;

  _https2.default.request(ajaxOptions, function (res2) {
    var data = '';
    console.log('receiving data');
    res2.setEncoding('utf8');

    res2.on('data', function (d) {
      data += d;
    });
    res2.end(function () {
      res.send(data);
    });
  });
},
    returnLatest = exports.returnLatest = function returnLatest(req, res) {};