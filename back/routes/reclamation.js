var express = require('express');
const reclamation = require('../model/reclamation');
var router = express.Router();
var Ruche = require('../model/reclamation.model');


router.post('/addreclamation', function(req, res, next) {
  var reclamation = new reclamation({  type: req.body.type, nom: req.body.nom,compte: req.body.compte,date: req.body.date,});
  ruche.save((err, newContact) => {
      if (err) {
          console.log('There is an error', err);
      }
      else {
        
          res.json(reclamation);



          console.log('reclamation ajoute!!');
          //res.send('respond with a resource');
      }
  });
});




router.get('/displayrec', function(req, res, next) {
    Reclamation.find(
      (err, Reclamation) => {
          
          res.json(Reclamation);
      }
    );
  });

  

  router.get('/searchrec', function(req, res, next) {
    Reclamation.findOne({nom:req.body.nom}, (err, cont) => {
      if(err) {
        console.log(err);
    }
      res.json(cont);
        
    });
});


router.put('/editrec/:id', function(req, res, next) {
    Reclamation.findById(req.params.id, (err, cont) => {
      if(err) {
          console.log(err);
      }

      cont.type = req.body.type;
      cont.nom = req.body.nom;
      cont.cont = req.body.cont;
      cont.date = req.body.date;
     
      cont.save((err, updatedCont) => {
        console.log("updated rechlamation !");
        res.send('updated');
        // res.redirect('/employe');
      });
  });
});


router.delete('/deleterec/:id', function(req, res, next) {
  Reclamation.findByIdAndRemove(req.params.id, (err, cont) => {
      if (err)
          console.log(err)
      else {
          res.json(cont);
          //res.send('delete');
          console.log('reclamartion supprimé!!');
      }

  });
});




  module.exports = router;