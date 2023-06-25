require('dotenv').config();

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

const mongoose = require('mongoose');

const createError = require('http-errors');

const bodyParser = require('body-parser'); 




require('./socket-handler');

var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users');

var app = express();


app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);

app.use('/users', usersRouter);

app.use('/api/auth', require('./routes/auth'));


app.use('/api/account', require('./routes/account'));



// app.use((err, req, res, next) => {
//   if(req.get('accept').includes('json')){
//   return next(createError(404));
//   }
//   res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
// });


app.use((err, req, res, next) => {

	console.log(err);

	if (err.name === 'MongoError' || err.name === 'validationError' || err.name === 'CastError') {

		err.status = 422;

	}

// 	res.status(err.status || 500).json({ message: err.message || "we have some error eccured." }); الكود الخاص بك
	res.status(err.statusCode || 500).json({ message: err.message || "we have some error eccured." });

});



app.use((err, req, res, next) => { 

  if(err.name === 'MongoError' || err.name === 'validationError' || err.name === 'CastError'){

    err.status = 422;
    
  }

  res.status(err.status || 500).json({message: err.message || "we have some error eccured."});

});



// mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useCreateIndex: true}, err => {
//     if(err) throw err; 
//     console.log('Connected successfully');
// });
// const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat', { useNewUrlParser: true })

  .then(() => console.log('Connected successfully'))

  .catch((err) => console.error('Could not connect to MongoDB', err));
  

  

 

module.exports = app;
