// The is the CSV file server
// It includes the parsing and conversion of the CSV data to json objects
// This has been done here to reduce the amount of work in the Vue client

const server = require('http').createServer();
const csv= require('csvtojson');

const csvFilePath='./train.csv';

server.on('request', (req, res) => {
  console.log('Request received');

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.writeHead(200, {"Content-Type": "application/json"});

  csv()
  .fromFile(csvFilePath)
  .on('json',(jsonObj)=>{
      var cleanJsonString = escapeSpecialChars(JSON.stringify(jsonObj));
      res.write(cleanJsonString);
  })
  .on('done',(error)=>{
      res.end();
      console.log('SERVER DONE');
  });

});

console.log('Server listening on port 4040');
server.listen(4040);

// Attempt to eliminate JSON parser errors caused by special characters
function escapeSpecialChars(jsonString) {
  return jsonString
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t")
      .replace(/\f/g, "\\f");
};
