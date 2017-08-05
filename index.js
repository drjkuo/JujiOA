var Twitter = require('twitter-node-client').Twitter;
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./data/twitter_config', encoding="ascii"));
var express = require('express');
var app = express();
var path = require('path');
var toBeSent = [];
var toBeSent2 = [];
// var PriorityQueue = require('js-priority-queue');

//Callback functions
var twitter = new Twitter(config);
	//Example calls

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


// twitter.getUserTimeline({ screen_name: 'nytimes', count: '200'}, error,
//   function (data) {
//     // console.log('Data [%s]', data);
//     data = JSON.parse(data);
//
//     function cmp(a, b) { return b.cnt - a.cnt; };
//     var tweetArr = []
//
//     console.log(data);
//     for (var i=0; i<data.length; i++) {
//       // console.log(`Data #${i}`, data[i].id_str, data[i].favorite_count);
//       tweetArr.push({id: data[i].id_str, cnt: data[i].favorite_count});
//     }
//     tweetArr.sort(cmp);
//
//     var topNumber = 20;
//     for (var i=0; i<topNumber; i++) {
//       toBeSent2.push(tweetArr[i].id);
//     }
//     console.log(toBeSent2);
//   }
// );
// twitter.getUserTimeline({ screen_name: 'nytimes','result\_type':'popular', count: '3'}, error, success);
// twitter.getSearch({'q':' movie -scary :) since:2013-12-27', 'count': 10, 'result\_type':'popular'}, error, success);


///////////////////////////



app.get('/', function (req, res) {
  toBeSent = [];
  res.sendFile(path.join(__dirname + '/index.html'));
  // res.send(toBeSent);
});

// var cb0 = function (req, res, next, cb1) {
//   console.log(req.query.twitterID);
//   var q = "from:"+req.query.twitterID;
//   twitter.getSearch({ 'q': q , 'result\_type':'popular', 'count': '10'}, error, success);
//   console.log("FIRST!!!!!");
//   console.log(toBeSent);
//   cb1(req, res, next);
// }
//
// var sent = function (req, res, next) {
//   toBeSent = JSON.stringify(toBeSent);
//   console.log("SECOND!!!!!");
//   res.send(toBeSent);
// }

app.get('/hot', function (req, res) {
  var q = "from:"+req.query.twitterID;
  twitter.getSearch({ 'q': q , 'result\_type':'popular', 'count': '10'}, error, function (data) {
      toBeSent = [];
      data = JSON.parse(data);
      for (var i=0; i<data.statuses.length; i++) {
        toBeSent.push(data.statuses[i].id_str);
      }
      toBeSent = JSON.stringify(toBeSent);
      res.send(toBeSent);
  });
});

app.get('/hot2', function (req, res) {
  twitter.getUserTimeline({ screen_name: req.query.twitterID, count: '10'}, error,
    function (data) {
      // console.log('Data [%s]', data);
      toBeSent2 = [];
      data = JSON.parse(data);

      function cmp(a, b) { return b.cnt - a.cnt; };
      var tweetArr = [];

      console.log(data);
      for (var i=0; i<data.length; i++) {
        // console.log(`Data #${i}`, data[i].id_str, data[i].favorite_count);
        tweetArr.push({id: data[i].id_str, cnt: data[i].favorite_count});
      }
      tweetArr.sort(cmp);
      var topNumber = 10;
      for (var i=0; i<topNumber; i++) {
        if (tweetArr[i]) toBeSent2.push(tweetArr[i].id);
      }
      // console.log(toBeSent2);
      toBeSent2 = JSON.stringify(toBeSent2);
      res.send(toBeSent2);
    }
  );
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
