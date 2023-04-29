const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const rucheRouter = require('./routes/ruche');


const catalogueRouter = require('./routes/catalogue');
const reclamationRouter = require('./routes/reclamation');
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const orderRouter = require('./routes/order');

const cors = require("cors");
const app = express();
app.use(cors());


// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');



// database connection
const dbURI = 'mongodb+srv://amine:amine@cluster0.yjmpdh4.mongodb.net/amine?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
  

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use('/ruche',rucheRouter);
app.use('/catalogue',catalogueRouter);
app.use('/reclamation',reclamationRouter);
app.use('/user',userRouter);
app.use('/order',orderRouter);



app.use(authRoutes);


module.exports = app;