var Twit = require('twit');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var T = new Twit({
    consumer_key: process.env.consumer_key,
    access_token: process.env.access_token,
    consumer_secret: process.env.consumer_secret,
    access_token_secret: process.env.access_token_secret,
});

function twitterData(target, sendBackResponseToBrowser) {
    
    var testHashtag = JSON.stringify(target);
    if(testHashtag[1] != '#'){
        target = '#' + target;
    }
    var advice = '';
    var likeCount = 0;
    var likeRetweet = 0;
    var tweetsFound = 0;
    T.get('search/tweets', { q: target, count: 500}, function(err, data, response) {
    if (err){
        console.log("This is the Error: ", err);
    }
    else {
        var tweets = data.statuses;
        tweetsFound += tweets.length;
        // console.log('Tweets: ', tweets[0]);
        if (tweetsFound < 25){
            advice = "This is a great Hashtag to Play";
        }else if (tweetsFound > 25 && tweetsFound < 80) {
            advice = "Its been used alot before, It could still be fun";
        }else {
            advice = "Dont use that Hashtag, its been used to much!";
        }
        for (var key in tweets){
            likeCount += Number(tweets[key].favorite_count);
            likeRetweet += Number(tweets[key].retweet_count);
            // console.log('tweet Likes:', tweets[key].favorite_count, likeCount);
            // console.log('tweet retweets:', tweets[key].retweet_count, likeRetweet);
        }
        likeCount = ((likeCount / tweetsFound) * 100).toFixed(1);
        likeRetweet = ((likeRetweet / tweetsFound) * 100).toFixed(1);
        // console.log('Like count', likeCount);
        // console.log("Count of likes", likeRetweet);
        
        sendBackResponseToBrowser(likeCount, likeRetweet, target, tweets, tweetsFound, advice);
        }
    });
}

router.get('/', function(req, res, next) {
    var target = req.query.serchTarget;
    twitterData(target, function(likeCount, likeRetweet, hashtag, tweets, tweetsFound, advice){
        res.render('hashtagSerch', {likeCount: likeCount, likeRetweet: likeRetweet, hashtag: hashtag,
        tweets: tweets, tweetsFound: tweetsFound, advice: advice});
    });
});

module.exports = router;