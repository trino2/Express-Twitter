var express = require('express');
var router = express.Router();
var https = require('https'); 
var btoa = require('btoa');

var keys = {
    client: process.env.TWITTER_CLIENT_ID , 
    secret: process.env.TWITTER_SECRET_KEY
};

var combined = keys.client + ":" + keys.secret; 
var base64encoded = btoa(combined); 


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
            // console.log("########################################"); 
            // console.log("status code: " + this.statusCode); 
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

function getTweets(accessToken, sendResponseToBrowser) {
    const options = {
        hostname: "api.twitter.com", 
        port: 443, 
        path: '/1.1/search/tweets.json?q=lol',
        method: 'GET', 
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
            // console.log("########################################"); 
            // console.log("status code: " + this.statusCode); 
            //console.log("Complete response: " + completeResponse); 
            
            var responseJSON = JSON.parse(completeResponse); 
            var tweetsList = responseJSON.statuses; 
            sendResponseToBrowser(tweetsList); 
      }); 
    });
    
    twitterRequest.end();
    
}



function doAllTwitterRequests(callback) {
    getAccessToken(function(accessToken) {
        getTweets(accessToken, function(tweets) {
            callback(null, tweets); 
        }); 
    }); 
}

module.exports.doAllTwitterRequests = doAllTwitterRequests;