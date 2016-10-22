export const imgSrchPath = 'image-search',
latestPath = imgSrchPath+'/latest',
showMainPage = (req, res)=> {
    let url = req.protocol + '://' + req.get('host') + req.originalUrl;
    
    res.render('index', { url: url,
                          title: 'Instructions | JSON Image Search',
                          imgSrchPath: imgSrchPath,
                          latestPath: latestPath
                        });
},
returnBySearch = (req, res)=> {},
returnLatest = (req, res)=> {};


export {showMainPage, returnBySearch, returnLatest, imgSrchPath, latestPath};
