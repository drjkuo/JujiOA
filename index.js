var Twitter = require('twitter-node-client').Twitter;
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./data/twitter_config', encoding="ascii"));

var toBeSent = "";
//Callback functions
var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    data = JSON.parse(data);
    for (var i=0; i<data.statuses.length; i++) {
      console.log(`Data #${i}`, data.statuses[i].text);
      // toBeSent += (`Data #${i}` + data.statuses[i].text);
    }
    toBeSent = data;
    // console.log('Data [%s]', data);
};

var twitter = new Twitter(config);
	//Example calls

	// twitter.getUserTimeline({ screen_name: 'drjkuo', count: '1'}, error, success);
// twitter.getUserTimeline({ screen_name: 'nytimes','result\_type':'popular', count: '3'}, error, success);
// twitter.getSearch({'q':' movie -scary :) since:2013-12-27', 'count': 10, 'result\_type':'popular'}, error, success);
twitter.getSearch({ 'q':'from:nytimes' , 'result\_type':'popular', 'count': '3'}, error, success);

///////////////////////////
var express = require('express');
var app = express();
var path = require('path');


app.get('/', function (req, res) {
  res.send(toBeSent);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
