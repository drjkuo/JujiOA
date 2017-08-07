# Representative Tweets

## TL;DR 
a link to the working Web site -- (1) http://54.202.23.65:3000/v2; (2) http://54.202.23.65:3000/

a link to the source code -- 
https://github.com/drjkuo/JujiOA

a link to a document -- 
https://github.com/drjkuo/JujiOA

## Description
A Twitter hot tweets viewer to show at most 10 "representative tweets" selected from the tweets of a twitter user.  
There are two types of "representativeness": (1) the author's definition -- the number of like; and (2) Twitter's popularity.

## Installation
`npm install`

`npm start`

## Implementation
Since [Twitter is running OAuth](https://dev.twitter.com/oauth/overview/introduction), I need a server to fetch tweets and I deploy my server on AWS EC2

As for the server setup, I use node.js and express web framework.  In order to deal with Twitter's Oauth and pull data from Twitter, [Twitter Libraries](https://dev.twitter.com/resources/twitter-libraries) can help us a lot, and I go with [TwitterJSClient](https://github.com/BoyCook/TwitterJSClient) by @BoyCook to help me.  

## Architecture 
### Representativeness: the number of like

Demo: http://54.202.23.65:3000/v2

![alt](https://github.com/drjkuo/JujiOA/blob/master/apiv2.png)

The diagram above shows the system architecture of first type of "representativeness": the author's definition -- the number of like.  When an user visit the landing page of our server, the server returns indexV2.html.  After the user enters one twitter handle, top 10 liked tweets will be displayed in the decreasing order.

You will be developing a working website that allows your users to see a twitter user's "representative tweets". At most 10 "representative tweets" must be selected from the tweets of a twitter user. You are free to devise your own implementation of "representativeness", as long as you can articulate your justification.
On your site, when a user enters a person's twitter handle, your user expects to see her/his representative tweets,  as well as the evidence of their representativeness. 

#### Client side
On the client side, in the main.js file, the display of top 10 liked tweets is done as follows: (1) The keypress "Enter" triggers an AJAX request and expects to receive data consisting of an array of tweet IDs; (2) On receiving the expected data, [Twitter's factory function](https://dev.twitter.com/web/javascript/creating-widgets) twttr.widgets.createTweet() help us to dynamically generates the desired widgets.
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
On the server side, in the index.js file, we leverage twitter.getUserTimeline by @BoyCook to pull the most recent 200 tweets of the designated twitter ID from Twitter.  Then, we sort those tweets by their number of liked and return top 10 liked tweets to the client.
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


![alt](https://github.com/drjkuo/JujiOA/blob/master/apiv1.png) 
[Twitter's popularity](https://dev.twitter.com/rest/reference/get/search/tweets)

<!-- <img src="https://github.com/drjkuo/JujiOA/blob/master/fileStructure.png" height="480" width="283" > -->




## Unit testing
Unit test, mocha, chai


## Build tools
Gulp





