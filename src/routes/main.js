const https = require('https'),
      google = require('googleapis'),
      customsearch = google.customsearch('v1'), // http://google.github.io/google-api-nodejs-client/14.0.0/customsearch.html

      imgSrchPath = 'image-search',
      latestPath = imgSrchPath+'/latest-qs',
      resultsPerPage = 5;

var latestQs = ['animal farming', 'future', 'education', 'city', 'gestation crates'],
    maxQsStored = 8;


exports.imgSrchPath = imgSrchPath;
exports.latestPath = latestPath;

exports.showMainPage = (req, res)=> {
  var url = req.protocol + '://' + req.get('host') + req.originalUrl;

  res.render('index', { url: url,
                        title: 'Instructions | JSON Image Search',
                        imgSrchPath: imgSrchPath,
                        latestPath: latestPath
                      });
};

exports.returnBySearch = (req, res)=> {
  var offset = parseInt(req.query.offset) || 1;

  if (! req.query.q) {
    res.status(400);
    res.json({error: 'q (query) is missing.'});
  } else {
    customsearch.cse.list({
        cx: process.env.CX,
        key: process.env.SEARCH_KEY,
        q: req.query.q,
        num: resultsPerPage,
        start: resultsPerPage*offset-resultsPerPage+1,
        searchType: 'image'
      }, (err, d)=>{
        if (err) {
          res.status(500);
          res.json({error: 'Internal error.'});
        } else if (d.items && d.items.length) {
          if (latestQs.length>=maxQsStored) {
            latestQs.shift();
          }
          latestQs.push(decodeURIComponent(req.query.q).toLowerCase().trim());

          res.json(d.items.map(o=>{
              return {
                alt: o.title,
                pageUrl: o.contextLink,
                src: o.link
              };
            }));
        } else {
          res.status(404);
          res.json({error: `No results for '${req.query.q}'`});
        }
    });
  }
},

exports.returnLatestQs = (req, res)=> {
  res.json({
    recentQueries: latestQs
  });
};
