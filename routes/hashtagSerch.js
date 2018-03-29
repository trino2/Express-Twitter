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


    var tweetsFound = 0;
    T.get('search/tweets', { q: target }, function(err, data, response) {
    if (err){
        console.log("This craped the bed: ", err);
    }
    else {
        var tweets = data.statuses;
        tweetsFound += tweets.length;
        sendBackResponseToBrowser(tweets, tweetsFound);
        }
    });
}

router.get('/', function(req, res, next) {
    var target = req.query.serchTarget;
    twitterData(target, function(tweets, tweetsFound){
        res.render('hashtagSerch', { title: 'Hashtag Search', tweets: tweets, tweetsFound: tweetsFound});
    });
});

module.exports = router;