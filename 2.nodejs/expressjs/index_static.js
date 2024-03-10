const express = require("express");
const app = express();
const path = require('path');

let dir = path.join(__dirname, '../../1.static')
let url = path.resolve(__dirname, '../../1.static/index.html')

app.use(express.static(dir));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Application started and Listening on port ${PORT}`);
});

app.get('/main', (req, res) =>{
  res.sendFile(url)
});

app.get('/test', (req, res) =>{
    res.setHeader('Content-Type', 'text/html')
    res.send('<h1>Test Page</h1>')
});

app.get('*',(req,res)=>{
  res.redirect('/main');
})


