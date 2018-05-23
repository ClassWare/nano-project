// This method generates an asynchronous stream
// Does not tie up memory for large files
const fs = require('fs');


server.on('request', (req, res) => {
  console.log('Request received');
  const src = fs.createReadStream('./train.csv');

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  src.pipe(res);



