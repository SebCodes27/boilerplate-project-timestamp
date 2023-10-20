// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  let validity = 'true';
  let inputDate = req.params.date;
  let date = new Date(inputDate);
  let unixDate = Date.parse(inputDate);
  if (!isNaN(new Date(inputDate)) !== true) {
    let numDate = Number(inputDate);
    date = new Date (numDate);
    unixDate = numDate;
    if (!isNaN(new Date(numDate)) !== true) {
      validity = 'false'
    }
  }
  if (inputDate === undefined) {
    validity = 'empty'
  };
  let utcDate = date.toUTCString();
  let currentDate = new Date();
  console.log(currentDate)
  if (validity === 'true') {
    res.json({
      unix: unixDate,
      utc: utcDate
    });
  } else if (validity === 'false') {
    res.json({
      error: 'Invalid Date'
    });
  } else {
    let unixDate = Date.parse(currentDate);
    let utcDate = currentDate.toUTCString();
    res.json({
      unix: unixDate,
      utc: utcDate
    });
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
