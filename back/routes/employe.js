var express = require('express');
var router = express.Router();
var Employe = require('../model/employe.model');


router.post('/add', function(req, res, next) {
  var employe = new Employe({cin: req.body.cin, nom: req.body.nom,prenom: req.body.prenom});
  employe.save((err, newContact) => {
      if (err) {
          console.log('There is an error', err);
      }
      else {
        
          res.json(employe);



          console.log('employe ajoute!!');
          //res.send('respond with a resource');
      }
  });
});




router.get('/display', function(req, res, next) {
    Employe.find(
      (err, Employe) => {
          
          res.json(Employe);
      }
    );
  });

  router.get('/search', function(req, res, next) {
    Employe.findOne({cin:req.body.cin}, (err, cont) => {
      if(err) {
        console.log(err);
    }
      res.json(cont);
        
    });
});


router.put('/edit/:id', function(req, res, next) {
  Employe.findById(req.params.id, (err, cont) => {
      if(err) {
          console.log(err);
      }

      cont.cin = req.body.cin;
      cont.nom = req.body.nom;
      cont.prenom = req.body.prenom;
      cont.save((err, updatedCont) => {
        console.log("updated !");
        res.send('updated');
        // res.redirect('/employe');
      });
  });
});




router.post('/delete/:id', function(req, res, next) {
  
  Employe.findByIdAndRemove(req.params.id, (err, cont) => {
      if (err)
          console.log(err)
      else {
          res.json(cont);
          res.send('delete');
          console.log('employe supprimé!!');
      }

  });
});



  module.exports = router;