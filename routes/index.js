var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home');
});
  
router.get('/all_books', function(req, res, next) {
    models.Book.findAll().then(function(books){
    /* render the index page */
    res.render("all_books", {books: books});
    /* if there is nothing in the 'Article' table */
  }).catch(function(error){
      res.send(500, error);
   });
});

/* not finished. Need to work out foreign keys for this one */
router.get('/all_loans', function(req, res, next) {
    models.Loan.findAll().then(function(loans){
    /* render the index page */
        res.render("all_loans", {loans: loans});
    /* if there is nothing in the 'Article' table */
  }).catch(function(error){
      res.send(500, error);
   });
});

router.get('/all_patrons', function(req, res, next) {
    models.Patron.findAll().then(function(patrons){
    /* render the index page */
        res.render("all_patrons", {patrons: patrons});
    /* if there is nothing in the 'Article' table */
  }).catch(function(error){
      res.send(500, error);
   });
});

/* not finished with this one. Need to do loan history at the bottom
of the page */
router.get('/book_detail/:id', function(req, res, next) {
    models.Book.findById(req.params.id).then(function(book){
    
        res.render("book_detail", {book: book});
    
  }).catch(function(error){
      res.send(500, error);
   });
});

router.get('/checked_books', function(req, res, next) {
    res.render('checked_books');
});

router.get('/checked_loans', function(req, res, next) {
    res.render('checked_loans');
});

router.get('/error', function(req, res, next) {
    res.render('error');
});

router.get('/books/new', function(req, res, next) {
    res.render('new_book');
});

router.get('/new_loan', function(req, res, next) {
    res.render('new_loan');
});

router.get('/patrons/new', function(req, res, next) {
    res.render('new_patron');
});

router.get('/overdue_books', function(req, res, next) {
    res.render('overdue_books');
});

router.get('/overdue_loans', function(req, res, next) {
    res.render('overdue_loans');
});

/* not finished with this one. Need to do loan history at the bottom
of the page */
router.get('/patron_detail/:id', function(req, res, next) {
    models.Patron.findById(req.params.id).then(function(patron){
    
        res.render("patron_detail", {patron: patron});
    
  }).catch(function(error){
      res.send(500, error);
   });
});

router.get('/return_book', function(req, res, next) {
    res.render('return_book');
});

module.exports = router;

