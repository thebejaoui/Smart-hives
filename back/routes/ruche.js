var express = require('express');
var router = express.Router();
var Ruche = require('../model/ruche.model');


router.post('/add', function(req, res, next) {
  var ruche = new Ruche({libele: req.body.libele, humidite: req.body.humidite,temperature: req.body.temperature,poids: req.body.poids,motion: req.body.motion});
  ruche.save((err, newContact) => {
      if (err) {
          console.log('There is an error', err);
      }
      else {
        
          res.json(ruche);



          console.log('ruche ajoute!!');
          //res.send('respond with a resource');
      }
  });
});




router.get('/display', function(req, res, next) {
    Ruche.find(
      (err, Ruche) => {
          
          res.json(Ruche);
      }
    );
  });

  

  router.get('/search', function(req, res, next) {
    Ruche.findOne({libele:req.body.libele}, (err, cont) => {
      if(err) {
        console.log(err);
    }
      res.json(cont);
        
    });
});


router.put('/edit/:id', function(req, res, next) {
    Ruche.findById(req.params.id, (err, cont) => {
      if(err) {
          console.log(err);
      }

      cont.libele = req.body.libele;
      cont.humidite = req.body.humidite;
      cont.temperature = req.body.temperature;
      cont.poids = req.body.poids;
      cont.motion = req.body.motion;
      cont.save((err, updatedCont) => {
        console.log("updated ruche !");
        res.send('updated');
        // res.redirect('/employe');
      });
  });
});


router.delete('/delete/:id', function(req, res, next) {
  Ruche.findByIdAndRemove(req.params.id, (err, cont) => {
      if (err)
          console.log(err)
      else {
          res.json(cont);
          res.send('delete');
          console.log('Ruche supprimé!!');
      }

  });
});




  module.exports = router;