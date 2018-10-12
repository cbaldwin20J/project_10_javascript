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
    models.Loan.findAll({include: [models.Patron, models.Book]}).then(function(loans){
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



router.post('/book_detail/:id', function(req, res, next) {
    models.Book.findById(req.params.id).then(function(book){
        if(book){
            return book.update(req.body);
        } else{
            res.send(404);
        }
    }).then(function(){
        res.redirect("/all_books"); 
    }).catch(function(error){
      if(error.name === "SequelizeValidationError") {
        models.Loan.findAll({include: [models.Patron], where: {book_id:req.params.id}}).then(function(loans){
        let book = models.Book.build(req.body);
        
        res.render("book_detail", {book:book, loans:loans, error:error})
        });
      } else {
        throw error;
      }
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
    res.redirect("/all_books");
    // if an error with creating the instance
  }).catch(function(error){
    // if the error is our custom validator we created in the model
      if(error.name === "SequelizeValidationError") {
        // re render the form, 'Article.build' I assume is send what we have for this instance, and send the errors.
        res.render("new_book", {book: models.Book.build(req.body), errors: error.errors});
      } 
  });
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

function formatDate2(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

router.get('/erase', function(req, res, next) {
    
    let returnByRaw = new Date();
    returnByRaw.setDate(returnByRaw.getDate() + 7);

    let returnBy = formatDate2(returnByRaw);
    let loanedOn = formatDate();

    models.Loan.create({ book_id: 17, patron_id: 5, loaned_on: loanedOn, return_by: returnBy }).then(function(loan){
        res.render('all_loans');
    });
});




router.get('/new_loan', function(req, res, next) {
    models.Book.findAll().then(function(books){
        models.Patron.findAll().then(function(patrons){
            let loanedOn = formatDate();
            let returnByRaw = new Date();
            returnByRaw.setDate(returnByRaw.getDate() + 7);
            let returnBy = formatDate2(returnByRaw);
            res.render('new_loan', {books:books, patrons:patrons, loanedOn:loanedOn, returnBy:returnBy});
        });
    });
    
});


router.post('/new_loan', function(req, res, next) {
  models.Loan.create(req.body).then(function() {
    console.log("*****************got past it");
    res.redirect("/all_loans/");
    // if an error with creating the instance
  }).catch(function(error){
    // if the error is our custom validator we created in the model
      if(error.name === "SequelizeValidationError") {
        models.Book.findAll().then(function(books){
            models.Patron.findAll().then(function(patrons){
                let loanedOn = formatDate();
                let returnByRaw = new Date();
                returnByRaw.setDate(returnByRaw.getDate() + 7);
                let returnBy = formatDate2(returnByRaw);
                res.render('new_loan', {books:books, patrons:patrons, loanedOn:loanedOn, returnBy:returnBy, errors: error.errors});
            });
        });// re render the form, 'Article.build' I assume is send what we have for this instance, and send the errors.
       }else {
        throw error;
      }
  }).catch(function(error){
      res.send(500, error);
   
    });
}); 
    








router.get('/patrons/new', function(req, res, next) {
    res.render('new_patron', {patron:{} });
});


router.post('/patrons/new', function(req, res, next) {
  // Create a new row in the 'Article' table. 'req.body' is the POST info.
  // function(article) is the newly created instance.
  models.Patron.create(req.body).then(function(patron) {
    // after created, then redirect to this url to display newly created instance.
    res.redirect("/all_patrons");
    // if an error with creating the instance
  }).catch(function(error){
    // if the error is our custom validator we created in the model
      if(error.name === "SequelizeValidationError") {
        // re render the form, 'Article.build' I assume is send what we have for this instance, and send the errors.
        res.render("new_patron", {patron: models.Patron.build(req.body), errors: error.errors});
      } 
  });
});









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
        models.Loan.findAll({include: [models.Book], where: {patron_id: req.params.id}}).then(function(loans){
            res.render("patron_detail", {loans: loans, patron:patron});
        });
        
  }).catch(function(error){
      res.send(500, error);
   });
});


router.post('/patron_detail/:id', function(req, res, next) {
    models.Patron.findById(req.params.id).then(function(patron){
        if(patron){
            return patron.update(req.body);
        } else{
            res.send(404);
        }
    }).then(function(){
        res.redirect("/all_patrons"); 
    }).catch(function(error){
      if(error.name === "SequelizeValidationError") {
        models.Loan.findAll({include: [models.Book], where: {patron_id: req.params.id}}).then(function(loans){
        let patron = models.Patron.build(req.body);
        
        res.render("patron_detail", {patron:patron, loans:loans, error:error});
        });
      } else {
        throw error;
      }
  }).catch(function(error){
      res.send(500, error);
   });
});



router.get('/return_book/:id', function(req, res, next) {
    models.Loan.findOne({include: [models.Book, models.Patron], where: {id: req.params.id}}).then(function(loan){
        
        res.render('return_book', {loan:loan, returned: formatDate()});
    });
    
});






router.post('/return_book/:id', function(req, res, next) {
    if(!req.body.returned_on || !(req.body.returned_on.match(/(\d{4})-(\d{2})-(\d{2})/))){
        let error = [new Error("'Returned On' needs be YYYY-MM-DD")];
        
        let loan = models.Loan.build(req.body);
        models.Loan.findOne({include: [models.Book, models.Patron], where: {id: req.params.id}}).then(function(loan){
        
        res.render('return_book', {loan:loan, returned: formatDate(), error:error});
    });

    }
    models.Loan.findById(req.params.id).then(function(loan){
        if(loan){
            return loan.update({returned_on: req.body.returned_on});
        } else{
            res.send(404);
        }
    }).then(function(){
        res.redirect("/all_loans"); 
    }).catch(function(error){
      if(error.name === "SequelizeValidationError") {
        let loan = models.Loan.build(req.body);
        
        res.render("return_book", {loan:loan, returned: formatDate(), error:error});
      } else {
        throw error;
      }
  }).catch(function(error){
      res.send(500, error);
   });
});
        
        
    










module.exports = router;

/* the Loan model is what connects the books and the patrons together. No need for a 
foreign key */