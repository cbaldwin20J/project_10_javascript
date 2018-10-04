var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("hey");
	models.Patron.findById(1).then(function(patron){
    /* render the index page */
    
    res.render('index', { title: patron.first_name });
    /* if there is nothing in the 'Article' table */
  }).catch(function(error){
  	res.render('index', { title: error });
});
});
  
  

module.exports = router;

