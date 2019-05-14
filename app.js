const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const wumRoutes = require('./api/routes/waterUsageManagement');
const bcmRoutes = require('./api/routes/bathroomCleanlinessManagement');
const bamRoutes = require('./api/routes/bathroomAvailabilityManagement.js')

//use mongoDB dbms to manage the database
mongoose.connect(
    'mongodb+srv://athurnm:dontangry1234@clusterbathroom-zbg5r.mongodb.net/test?retryWrites=true'
    , {
        useNewUrlParser: true
    }
);

mongoose.Promise = global.Promise

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use('/wum', wumRoutes)
app.use('/bcm', bcmRoutes)
app.use('/bam', bamRoutes)

// if the path is wrong instatiate callback (404)
app.use((req, res, next) => {
    const error = new Error('page not found');
    error.status = 404;
    next(error);
});

//if error exist, do make the message
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;