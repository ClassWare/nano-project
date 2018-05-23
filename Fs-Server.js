const fs = require('fs');


server.on('request', (req, res) => {
  console.log('Request received');
  fs.readFile('./train.csv', function(err, data) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });



