var Twitter = require('twitter-node-client').Twitter;
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./data/twitter_config', encoding="ascii"));

//Callback functions
var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    data = JSON.parse(data);
    for (var i=0; i<data.length; i++) {
      console.log(`Data #${i}`, data[i].text);
    }
    // console.log('Data [%s]', data);
};

var twitter = new Twitter(config);
	//Example calls

	// twitter.getUserTimeline({ screen_name: 'drjkuo', count: '1'}, error, success);
	twitter.getUserTimeline({ screen_name: 'medium','result\_type':'popular', count: '5'}, error, success);
// twitter.getSearch({'q':' movie -scary :) since:2013-12-27', 'count': 10, 'result\_type':'popular'}, error, success);
