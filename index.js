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

app.use(function(req, res, next){
  console.log (req.method + " " + req.path + " - " + req.ip);
  next();
})

// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  var queryDate = new Date(req.params.date);
  if (queryDate.toString() === 'Invalid Date')  {
      queryDate = new Date(parseInt(req.params.date))
  }
  if (queryDate.toString() === 'Invalid Date') {
    res.json({error: "Invalid Date"});
  } else {
    res.json({unix: queryDate.getTime(), utc: queryDate.toUTCString()});
  }
});

app.get("/api/", function(req, res) {
  var currDate = new Date();
  res.json({unix: currDate.getTime(), utc: currDate.toUTCString()});
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
