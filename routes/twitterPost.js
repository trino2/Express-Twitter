var Twit = require('twit');
var config = require('./config')
var T = new Twit(config);

var tweet = { status: 'Full of fuel for work' }
/*
const options = {
    headers: {
        consumer_key: process.env.consumer_key,
       consumer_secret: process.env.TWITTER_SECRET_KEY,
       access_token: process.env.access_token,
       access_token_secret: process.env.access_token_secret
    }
}
*/
  T.post('statuses/update', tweet, tweeted)

    function tweeted(err, data, response) {
      if(err){
       console.log("Something went wrong!");
       }else{
        console.log("Tweet has been sent!");
    }
}

/* This code is for Likes!
var id = { id: '912545556190314498'}
  T.post('favorites/create', id, tweeted)

    function tweeted(err, data, response) {
      if(err){
       console.log("Something went wrong!");
       }else{
        console.log("Tweet has been sent!");
    }
}*/