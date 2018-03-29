var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Twitters Critter'});
});

module.exports = router;