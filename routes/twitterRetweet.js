var Twit = require('twit');
var T = new Twit(require('./config.js'));

// Debug flag
var debug = false;

// This is the URL of a search for the latest tweets on the #hashtag.
var target = { q: '@trinorx7 ', count: 10, result_type: 'recent' };

// This function finds the latest tweet with the #hashtag, and retweets it.
function retweet () {
  T.get('search/tweets', target, function (error, data) {
    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++) {
     // console.log(tweets[i].text)
    //}
    // If our search request to the server had no errors...
  //  if (!error) {
      // ...then we grab the ID of the tweet we want to retweet...
      var retweetId = data.statuses[i].id_str;
      // ...and then we tell Twitter we want to retweet it!
      T.post('statuses/retweet/' + retweetId, {}, tweeted);
      // console.log(retweetId);
//  }
    // However, if our original search request had an error, we want to print it out here.
  //  else {
      if (debug) {
        console.log('There was an error with your hashtag search:', error);
        }
  //    }
    }
  });
}

// Make sure it worked!
function tweeted (err, reply) {
  if (err !== undefined) {
    console.log(err);
  } else {
    console.log('Retweet has been made!');
  }
}

// Try to retweet something as soon as we run the program...
retweet();