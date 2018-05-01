
     ,-----.,--.                  ,--. ,---.   ,--.,------.  ,------.
    '  .--./|  | ,---. ,--.,--. ,-|  || o   \  |  ||  .-.  \ |  .---'
    |  |    |  || .-. ||  ||  |' .-. |`..'  |  |  ||  |  \  :|  `--, 
    '  '--'\|  |' '-' ''  ''  '\ `-' | .'  /   |  ||  '--'  /|  `---.
     `-----'`--' `---'  `----'  `---'  `--'    `--'`-------' `------'
    ----------------------------------------------------------------- 


Welcome to Heroku web app for serching Hashtag's in Twitter

In index.js file user would type hashtag to serch twitter and data is
sent to hashtagSerch.js file(/routes/hashtagSerch.js) where a Twitter
API is called using Twit to get data from twitter (i.e. text, likes, 
retweets, hashtag's). The information is processed then sent to jade 
file were its displayed.

**************************************************************************
npm Twit: 
https://www.npmjs.com/package/twit

**************************************************************************
API Web Resource Library:
https://www.programmableweb.com

**************************************************************************
Web cite url address: 
https://twitter-critter.herokuapp.com/

**************************************************************************
Add content to Web cite commands: 
$ git add .
$ git commit -am "make it better"
$ git push heroku master

**************************************************************************
Make a immage of git to github
git push --mirror git@github.com:username/project.git

**************************************************************************