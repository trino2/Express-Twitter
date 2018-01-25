var express = require('express');
var router = express.Router();
var https = require('https'); 
var btoa = require('btoa');

var keys = {
    client: process.env.TWITTER_CLIENT_ID, 
    secret: process.env.TWITTER_SECRET_KEY
};

var combined = keys.client + ":" + keys.secret; 
var base64encoded = btoa(combined); 
// Example from the teacher does not work for post!

function getAccessToken(handleAccessTokenResponse) {
    const options = {
        hostname: "api.twitter.com", 
        port: 443, 
        path: '/oauth2/token',
        method: 'POST', 
        headers: {
            'Authorization': 'Basic ' + base64encoded, 
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    }; 
    
    var postData = 'grant_type=client_credentials'; 
    var completeResponse = ''; 
    
    // Set up the request
    var postReq = https.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          //console.log('Response: ' + chunk);
          completeResponse += chunk; 
      });
      
      res.on('end', function() {
            console.log("########################################"); 
            console.log("status code: " + this.statusCode); 
            //console.log("Complete response: " + completeResponse); 
            var responseJSON = JSON.parse(completeResponse); 
            var accessToken = responseJSON.access_token; 
            
            handleAccessTokenResponse(accessToken); 
            
            /*execute callback*/
            //sendBackResponseToBrowser(apiResponse); 
            
      }); 
    });
    
    postReq.write(postData);
    postReq.end();
}

function postTweets(accessToken, sendResponseToBrowser) {
    const options = {
        hostname: "api.twitter.com", 
        port: 8080, 
        path: '/1.1/statuses/update.json',
        method: 'POST',
        status: '#MoviesWithPMS silence of the tampons',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }; 
    
    var completeResponse = ''; 
    
    // Set up the request
    var twitterRequest = https.request(options, function(twitterResponse) {
      twitterResponse.setEncoding('utf8');
      twitterResponse.on('data', function (chunk) {
          //console.log('Response: ' + chunk);
          completeResponse += chunk; 
      });
      
      twitterResponse.on('end', function() {
            console.log("########################################"); 
            console.log("status code: " + this.statusCode); 
            //console.log("Complete response: " + completeResponse); 
            
            var responseJSON = JSON.parse(completeResponse); 
            var tweetsList = responseJSON.statuses; 
            sendResponseToBrowser(tweetsList); 
      }); 
    });
    
    twitterRequest.end();
}

router.get('/', function(req, res, next) {
  getAccessToken(function(accessToken) {
    postTweets(accessToken, function(tweets) {
        res.render('twitterPostEnVar', {tweets: tweets});
        console.log("Tweet");
    }); 
  }); 
});

module.exports = router;