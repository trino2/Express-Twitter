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
    // Value from index page and checks for # and adds it if not found!
    var testHashtag = JSON.stringify(target);
    if(testHashtag[1] != '#'){
        target = '#' + target;
    }
    // Gets the actual raw tweets from twitter 
    T.get('search/tweets', {count: 100}, function(err, data, response) {
        var tweets = '';
        var advice = '';
        var likeCount = 0;
        var likeRetweet = 0;
        var tweetsFound = 0;
    if (err){
        // If a error hapes this will dysplay something to cite
        console.log("This is the Error: ", err);
        tweets = { text: 'Not tweets found!' };
        advice = 'Twitter is not responding!';
        
        sendBackResponseToBrowser(likeCount, likeRetweet, target, tweets, tweetsFound, advice);
    }
    else {
        // Gets only the tweets data
        tweets = data.statuses;
        tweetsFound += tweets.length;
        // Running adding tootal will display one of 3 options bellow
        if (tweetsFound < 25 && tweetsFound != 0){
            advice = 'This is a great Hashtag to Play';
        }else if (tweetsFound > 25 && tweetsFound < 80) {
            advice = "Its been used alot before, It could still be fun";
        }else {
            advice = "Dont use that Hashtag, its been used to much!";
        }
        // Gets just the likes and retweets from all the tweets found add total
        for (var key in tweets){
            likeCount += Number(tweets[key].favorite_count);
            likeRetweet += Number(tweets[key].retweet_count);
        }
        // Uses data calculated and sets the % of the likes and retweets found
        likeCount = ((likeCount / tweetsFound) * 100).toFixed(1);
        likeRetweet = ((likeRetweet / tweetsFound) * 100).toFixed(1);
        
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