var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('user', { title: 'Hashtag Search'});
});

module.exports = router;