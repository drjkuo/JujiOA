window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
  t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
  return t;
}(document, "script", "twitter-wjs"));

//create
var noShow = document.createElement('div');
noShow.id = "noShow";
noShow.style.display="none";
noShow.innerHTML="<h2>Try something more popular!</h2>";
document.body.appendChild(noShow);
//create div for tweets
var tweetNum = 10;
for (var i=0; i<tweetNum; i++) {
  var g = document.createElement('div');
  g.id = `id${i}`;
  document.body.appendChild(g);
}

// document.getElementById("twitterID").addEventListener("keypress", function(event)
function pressEnter (event){
  console.log("OK");
  if (event.which == 13 || event.keyCode == 13) {
    event.preventDefault();
    // if (event.which == 13 || event.keyCode == 13) {
    var twitterID = document.getElementById("twitterID").value;
    // var twitterID = "nytimes";
    // var url = "http://54.202.23.65:3000/hot2?twitterID="+twitterID;
    var url = "http://localhost:3000/hot?twitterID="+twitterID;
    $.getJSON( url, function( data ) {
      console.log(data);
      var p = data;
      noShow.style.display= (data.length === 0) ? "" : "none";
      for (var i=0; i<tweetNum; i++) {
        document.getElementById(`id${i}`).innerHTML = ""; // clear div
        twttr.widgets.createTweet( // twitter api
          data[i],
          document.getElementById(`id${i}`),
          {
            align: 'left'
          })
          .then(function (el) {
            console.log("Tweet displayed.")
          });
        }
      }).fail(function() {
        console.log( "Tweets Could Not Be Loaded." );
      });
      return false;
    }
  };
