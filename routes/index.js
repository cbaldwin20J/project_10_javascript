var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("hey");
	models.Book.findById(5).then(function(book){
    /* render the index page */
    console.log("************here's the books: " + book.title);
    res.render('index', { title: book.title });
    /* if there is nothing in the 'Article' table */
  }).catch(function(error){
});
});
  
  

module.exports = router;

