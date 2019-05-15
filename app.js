const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cleanreportRoutes = require('./api/routes/cleanlinessReport.js')
const cleancommandRoutes = require('./api/routes/cleanlinessCommand.js')
const availabilitycommandRoutes = require('./api/routes/availabilityCommand.js')
const availabilityreportRoutes = require('./api/routes/availabilityReport.js')
const availabilityManagementRoutes = require('./api/routes/AvailabilityManagement.js')
const waterUsageLoggingRoutes = require('./api/routes/waterUsageLogging.js')
const waterPollutionLoggingRoutes = require('./api/routes/waterPollutionLogging.js')



//use mongoDB dbms to manage the database
mongoose.connect(
    'mongodb+srv://athurnm:dontangry1234@clusterbathroom-zbg5r.mongodb.net/bathroom-services-api?retryWrites=true'
    // for development: 'mongodb://localhost:27017/bathroom-services-api?retryWrites=true'
    , {
        useNewUrlParser: true,
        useCreateIndex: true
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
app.use('/cleanReport', cleanreportRoutes)
app.use('/cleanCommand', cleancommandRoutes)
app.use('/availabilityCommand', availabilitycommandRoutes)
app.use('/availabilityReport', availabilityreportRoutes)
app.use('/waterUsageLogging', waterUsageLoggingRoutes)
app.use('/waterPollutionLogging', waterPollutionLoggingRoutes)
app.use('/availabilityManagement', availabilityManagementRoutes)

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