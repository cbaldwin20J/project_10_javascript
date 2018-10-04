var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home');
});
  
router.get('/all_books', function(req, res, next) {
    res.render('all_books');
});

router.get('/all_loans', function(req, res, next) {
    res.render('all_loans');
});

router.get('/all_patrons', function(req, res, next) {
    res.render('all_patrons');
});

router.get('/book_detail', function(req, res, next) {
    res.render('book_detail');
});

router.get('/checked_books', function(req, res, next) {
    res.render('checked_books');
});

router.get('/check_loans', function(req, res, next) {
    res.render('check_loans');
});

router.get('/error', function(req, res, next) {
    res.render('error');
});

router.get('/new_book', function(req, res, next) {
    res.render('new_book');
});

router.get('/new_loan', function(req, res, next) {
    res.render('new_loan');
});

router.get('/new_patron', function(req, res, next) {
    res.render('new_patron');
});

router.get('/overdue_books', function(req, res, next) {
    res.render('overdue_books');
});

router.get('/overdue_loans', function(req, res, next) {
    res.render('overdue_loans');
});

router.get('/patron_detail', function(req, res, next) {
    res.render('patron_detail');
});

router.get('/return_book', function(req, res, next) {
    res.render('return_book');
});

module.exports = router;

