var Twitter = require('twitter-node-client').Twitter;
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./data/twitter_config', encoding="ascii"));
var express = require('express');
var app = express();
var path = require('path');
var twitter = new Twitter(config);

var toBeSent = [];
var toBeSent2 = [];

//Callback functions
var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    toBeSent = [];
    data = JSON.parse(data);
    for (var i=0; i<data.statuses.length; i++) {
      // console.log(`Data #${i}`, data.statuses[i].text);
      toBeSent.push(data.statuses[i].id_str);
      // toBeSent += (`Data #${i}` + data.statuses[i].text);
    }
    toBeSent = JSON.stringify(toBeSent);
    // res.send(toBeSent);
    console.log(toBeSent);
    // console.log('Data [%s]', data);
};


//Landing page
app.get('/', function (req, res) {
  toBeSent = [];
  res.sendFile(path.join(__dirname + '/index.html'));
  // res.send(toBeSent);
});

app.get('/v2', function (req, res) {
  toBeSent = [];
  res.sendFile(path.join(__dirname + '/indexV2.html'));
  // res.send(toBeSent);
});

//API v1: TOP 10 most popular tweets defined by Twitter.com
app.get('/hot', function (req, res) {
  var q = "from:"+req.query.twitterID;
  twitter.getSearch({ 'q': q , 'result\_type':'popular', 'count': '10'},
    error,
    function (data) {
      toBeSent = [];
      data = JSON.parse(data);
      for (var i=0; i<data.statuses.length; i++) {
        toBeSent.push(data.statuses[i].id_str);
      }
      res.json(toBeSent);
  });
});


//API v2: TOP 10 LIKED tweets defined by CY Kuo, gather most recent 200 tweets and return top 10 tweets with top likes
app.get('/hot2', function (req, res) {
  twitter.getUserTimeline({ screen_name: req.query.twitterID, count: '200'},
    error,
    function (data) {
      // console.log('Data [%s]', data);
      toBeSent2 = [];
      data = JSON.parse(data);

      function cmp(a, b) { return b.cnt - a.cnt; };
      var tweetArr = [];

      // console.log(data);
      for (var i=0; i<data.length; i++) {
        tweetArr.push({id: data[i].id_str, cnt: data[i].favorite_count});
      }
      tweetArr.sort(cmp);
      var topNumber = 10;
      for (var i=0; i<topNumber; i++) {
        if (tweetArr[i]) toBeSent2.push(tweetArr[i].id);
      }
      res.json(toBeSent2);
    }
  );
});

// app.use(express.static(__dirname + 'assets/'));
app.use(express.static('assets'));
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app; // for testing
