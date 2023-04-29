var express = require('express');
var router = express.Router();
var Order = require('../models/order');
const order = require('../models/order');
const nodemailer = require('nodemailer');


router.post('/add', function(req, res, next) {
  var ordre = new Order({libele: req.body.libele, adresse: req.body.adresse,totalprice: req.body.totalprice,date: req.body.date,userid:req.body.userid });
  ordre.save((err, newOrdre) => {
      if (err) {
          console.log('There is an error', err);
      }
      else {
        
          res.json(ordre);



          console.log('Order ajoute!!');
          //res.send('respond with a resource');
      }
      

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'med.benabdeladhim@gmail.com',
        pass: 'njxutksfeawzafhl'
    }
});

// setup email data with unicode symbols
let mailOptions = {
   
    from: ' med.benabdeladhim@gmail.com', // sender address
    to: 'mohamedamine.bejaoui@esprit.tn', // list of receivers
    subject: 'Catalogue Ajouter ', // Subject line
    text: 'vous avez ajouter un nouveau catalogue', // plain text body
    html: 'aaaa' // html body
};
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
});

  });
});




router.get('/display', function(req, res, next) {
    Order.find(
      (err, Order) => {
          
          res.json(Order);
      }
    );
  });

  

  router.get('/search', function(req, res, next) {
    Catalogue.findOne({libele:req.body.libele}, (err, cont) => {
      if(err) {
        console.log(err);
    }
      res.json(cont);
        
    });
});


router.put('/edit/:id', function(req, res, next) {
    Order.findById(req.params.id, (err, cont) => {
      if(err) {
          console.log(err);
      }

      cont.libele = req.body.libele;
      cont.adresse = req.body.adresse;
      cont.totalprice = req.body.totalprice;
      cont.date = req.body.date;
  
      cont.save((err, updatedCont) => {
        res.json(cont);
        
        // res.redirect('/employe');
      });
  });
});


router.delete('/delete/:id', function(req, res, next) {
  Order.findByIdAndRemove(req.params.id, (err, cont) => {
      if (err)
          console.log(err)
      else {
          res.json(cont);
          //res.send('delete');
          console.log('Order supprimé!!');
      }

  });
});

router.get('/displayorders/:userid', async (req, res) => {
    try {
      const orders = await order.find({ userid: req.params.userid });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


  module.exports = router;