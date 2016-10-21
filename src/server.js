import express from 'express';
const app = express(),
      port = 3000;

app.get('/', (req,res)=>{
    res.send('Running');
});

app.listen(port, 'localhost', ()=>{
    console.log(`The server is listening to port ${port}`);
});
