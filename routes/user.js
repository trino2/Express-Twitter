var express = require('express');
var Twit = require('twit');
var router = express.Router();

var T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  // timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

function twitterData(sendBackResponseToBrowser) {
    var tweets = '';
    T.get('search/tweets', { q: 'lol', count: 30 }, function(err, data, response) {
    if (err){
        console.log("This craped the bed: ", err);
    }
    else {
        console.log("Tweeter send this: ", data);
        tweets = JSON.stringify(data);
        sendBackResponseToBrowser(tweets);
        }
    });
}

router.get('/', function(req, res, next) {
    twitterData(function(tweets){
        res.render('user', { title: 'Hashtag Search', tweets: tweets});
    });
});

module.exports = router;