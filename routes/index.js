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
        models.Loan.findAll({include: [models.Patron], where: {book_id:req.params.id}}).then(function(loans){
            res.render("book_detail", {book:book, loans:loans});
        });
    }).catch(function(error){
      res.send(500, error);
        });
});

router.get('/checked_books', function(req, res, next) {
    models.Loan.findAll({include: [models.Book], where: {returned_on: null}}).then(function(loans){
        res.render('checked_books', {unreturned_loans: loans});
    });
    
});

router.get('/checked_loans', function(req, res, next) {
    models.Loan.findAll({include: [models.Book, models.Patron], where: {returned_on: null}}).then(function(loans){
        res.render('checked_loans', {unreturned_loans: loans});
    });
    
});

router.get('/error', function(req, res, next) {
    res.render('error');
});

router.get('/books/new', function(req, res, next) {
    res.render('new_book', {book:{}});
});


router.post('/books/new', function(req, res, next) {
  // Create a new row in the 'Article' table. 'req.body' is the POST info.
  // function(article) is the newly created instance.
  models.Book.create(req.body).then(function(book) {
    // after created, then redirect to this url to display newly created instance.
    res.redirect("/book_detail/" + book.id);
    // if an error with creating the instance
  }).catch(function(error){
    // if the error is our custom validator we created in the model
      if(error.name === "SequelizeValidationError") {
        // re render the form, 'Article.build' I assume is send what we have for this instance, and send the errors.
        res.render("new_book", {book: models.Book.build(req.body), errors: error.errors});
      } 
  });
});




router.get('/erase', function(req, res, next) {
    models.Book.findOne().then(function(book){
        console.log("****************" + book.first_published);
    })
})




router.get('/new_loan', function(req, res, next) {
    res.render('new_loan');
});

router.get('/patrons/new', function(req, res, next) {
    res.render('new_patron');
});

function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

router.get('/overdue_books', function(req, res, next) {
    models.Loan.findAll({include: [models.Book], where: {returned_on: null, return_by:{$lt:formatDate()}}}).then(function(loans){
        res.render('overdue_books', {overdue_loans: loans});
    });
    
});

router.get('/overdue_loans', function(req, res, next) {
    models.Loan.findAll({include: [models.Book, models.Patron], where: {returned_on: null, return_by:{$lt:formatDate()}}}).then(function(loans){
        res.render('overdue_loans', {overdue_loans: loans});
    });
    
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

/* the Loan model is what connects the books and the patrons together. No need for a 
foreign key */