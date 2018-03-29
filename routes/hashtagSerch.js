var Twit = require('twit');
var express = require('express');
var serchTarget = require("./index");
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var T = new Twit({
    consumer_key: process.env.consumer_key,
    access_token: process.env.access_token,
    consumer_secret: process.env.consumer_secret,
    access_token_secret: process.env.access_token_secret,
});

function twitterData(sendBackResponseToBrowser) {
    
    var tweets = '';
    var target = 'lol';
    serchTarget;
    T.get('search/tweets', { q: target, count: 30 }, function(err, data, response) {
    if (err){
        console.log("This craped the bed: ", err);
    }
    else {
        tweets = data.statuses;
        sendBackResponseToBrowser(tweets);
        }
    });
}

router.get('/', function(req, res, next) {
    twitterData(function(tweets){
        res.render('hashtagSerch', { title: 'Hashtag Search', tweets: tweets});
    });
});

module.exports = router;