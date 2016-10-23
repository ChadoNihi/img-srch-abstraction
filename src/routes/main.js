import https from 'https';

let latestQ = 'factory%20farming',
    ajaxOptions = {
        headers: {
           'Content-Type': 'application/json'
        },
        hostname: 'www.googleapis.com',
        json: true
    };

export const imgSrchPath = 'image-search',
latestPath = imgSrchPath+'/latest',

showMainPage = (req, res)=> {
  let url = req.protocol + '://' + req.get('host') + req.originalUrl;

  res.render('index', { url: url,
                        title: 'Instructions | JSON Image Search',
                        imgSrchPath: imgSrchPath,
                        latestPath: latestPath,
                        latestQ: latestQ
                      });
},

returnBySearch = (req, res)=> {
  ajaxOptions.path = `/customsearch/v1?q=nuts&cx=${process.env.CX}&searchType=image&key=${process.env.SEARCH_KEY}`;
  ajaxOptions.path += `&q=${latestQ}`;

  https.request(ajaxOptions, (res2)=>{
    let data = '';
    console.log('receiving data');
    res2.setEncoding('utf8');

    res2.on('data', d=>{
      data += d;
    });
    res2.end(()=>{
      res.send(data);
    });
  });
},

returnLatest = (req, res)=> {

};
