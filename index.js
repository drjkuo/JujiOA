var Twitter = require('twitter-node-client').Twitter;
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./data/twitter_config', encoding="ascii"));

//Callback functions
var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    console.log('Data [%s]', data);
};

var twitter = new Twitter(config);
	//Example calls

	twitter.getUserTimeline({ screen_name: 'drjkuo', count: '1'}, error, success);
