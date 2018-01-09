## Working on Java server version

```java
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;

import java.io.IOException;
import java.util.List;

public class test {
    public static void main(String[] args) throws TwitterException, IOException {
        // gets Twitter instance with default credentials
        Twitter twitter = new TwitterFactory().getInstance();
        try {
            List<Status> statuses;
            String user;
            if (args.length == 1) {
                user = args[0];
                statuses = twitter.getUserTimeline(user);
            } else {
                user = twitter.verifyCredentials().getScreenName();
                statuses = twitter.getUserTimeline();
            }
            System.out.println("Showing @" + user + "'s user timeline.");
            for (Status status : statuses) {
                System.out.println("@" + status.getUser().getScreenName() + " - " + status.getText());
            }
        } catch (TwitterException te) {
            te.printStackTrace();
            System.out.println("Failed to get timeline: " + te.getMessage());
            System.exit(-1);
        }
    }
}
```

## Description
A Twitter hot tweets viewer to show at most 10 "representative tweets" selected from the tweets of a twitter user.  
There are two types of "representativeness": (1) the author's definition -- the number of like; and (2) Twitter's popularity.

## Installation
Please add a twitter_config file as advised [here](https://github.com/BoyCook/TwitterJSClient#usage) before the following steps.

`npm install`

`npm start`

## Implementation
[Twitter is running OAuth](https://dev.twitter.com/oauth/overview/introduction), so we need a server to fetch tweets from Twitter.  As for the server setup, I use node.js and express.js web framework.  In order to deal with Twitter's Oauth and pull data from Twitter, [Twitter Libraries](https://dev.twitter.com/resources/twitter-libraries) can help a lot, and I go with [TwitterJSClient](https://github.com/BoyCook/TwitterJSClient) by @BoyCook.  During the development, I use Gulp to automate and enhance my workflow.  I also perform unit tests on the APIs of the server with Mocha and Chai.  At last, I deploy the application to AWS EC2.

## Architecture 
### Representativeness: (1) the number of like

![alt](https://github.com/drjkuo/JujiOA/blob/master/readme/apiv2.png)

The diagram above shows the system architecture of first type of "representativeness": the author's definition -- the number of like.  When an user visit the landing page of our server, the server returns indexV2.html.  After the user enters one twitter handle, top 10 liked tweets will be displayed in the decreasing order.

#### Client side
On the client side, in the main.js file, the display of top 10 liked tweets is done as follows: (1) The keypress "Enter" triggers an AJAX request and expects to receive data consisting of an array of tweet IDs; (2) On receiving the expected data, [Twitter's factory function](https://dev.twitter.com/web/javascript/creating-widgets) twttr.widgets.createTweet() help us to dynamically generates the desired widgets; (3) The browser will show top 10 liked tweets in a decreasing order.
```javascript
  function apiV2 (event){
    if (event.which == 13 || event.keyCode == 13) {
      event.preventDefault();
      var twitterID = document.getElementById("twitterID").value;
      // remember to replace localhost with your site IP
      var url = "http://localhost:3000/hot2?twitterID="+twitterID;
      $.getJSON( url, function( data ) {
        noShow.style.display= (data.length === 0) ? "" : "none";
        for (var i=0; i<tweetNum; i++) {
          // clear div
          document.getElementById(`id${i}`).innerHTML = "";
          // Twitter factory api for dynamically generating widgets 
          twttr.widgets.createTweet( 
            data[i],
            document.getElementById(`id${i}`),
            {
              align: 'left'
            })
          ......
      }
```

#### Server side
On the server side, in the index.js file, I leverage twitter.getUserTimeline by @BoyCook to pull the most recent 200 tweets of the designated twitter ID from Twitter.  Then, I sort those tweets by their number of liked and return top 10 liked tweets to the client.  One enhancement could be made by replacing sort() with the help of a priority queue.
```javascript
app.get('/hot2', function (req, res) {
  twitter.getUserTimeline({ screen_name: req.query.twitterID, count: '200'},
    error,
    function (data) {
      toBeSent2 = [];
      data = JSON.parse(data);
      // Sort tweet IDs by the number of liked
      function cmp(a, b) { return b.cnt - a.cnt; };
      var tweetArr = [];
      for (var i=0; i<data.length; i++) {
        tweetArr.push({id: data[i].id_str, cnt: data[i].favorite_count});
      }
      tweetArr.sort(cmp);
      // Top 10 liked tweets
      var topNumber = 10;
      for (var i=0; i<topNumber; i++) {
        if (tweetArr[i]) toBeSent2.push(tweetArr[i].id);
      }
      res.json(toBeSent2);
    }
  );
});
```

### Representativeness: (2) Twitter's popularity

Demo: http://52.41.191.125:3000/

![alt](https://github.com/drjkuo/JujiOA/blob/master/readme/apiv1.png) 

The diagram above shows the system architecture of second type of "representativeness": [Twitter's popularity](https://dev.twitter.com/rest/reference/get/search/tweets).  When an user visit another landing page of our server, the server returns index.html.  After the user enters one twitter handle, top 10 popular tweets will be displayed, where Twitter does not indicate how they evaluate the popularity.

#### Client side
The client side works very similar to the abovementioned.  The difference is sending the request to another API.  

#### Server side
On the server side, in the index.js file, I leverage twitter.getSearch by @BoyCook to pull the most 10 popular tweets of the designated twitter ID from Twitter, and return top 10 liked tweets to the client.  

```javascript
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
```

## Unit testing
Unit testing on the three APIs (GET /, GET /hot, GET /hot2) of the server.
![alt](https://github.com/drjkuo/JujiOA/blob/master/readme/unitTest.png) 

## Build tools
I use Gulp to help on JS file uglify and html minify.

## Future work
Due to the limitation (max 200 tweets) of tweetsTwitter's timeline API, if we would like to pull more than 200 of most recent tweets, we need to check with [Working with Timelines](https://dev.twitter.com/rest/public/timelines) to paginate large result sets. 
