/*
 * This file is the backend of water pollution logging (waterPollutionLogging) services and handling all HTTP methods
 * All logic of water pollution logging services are implemented here
 * filename: waterPollutionLogging.js
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const water_pollution_log = require('../models/water_pollution_log')


// isLower
const isLower = (tempPollutionRate, currentPollutionRate) => {
    return new Promise((res,rej)=>{
        if (tempPollutionRate<0 || currentPollutionRate<0) {
            return rej('pollution rate must be >= 0')
        } else {
            res(tempPollutionRate>currentPollutionRate)
        }
    })
}

// Adding new starting PollutionRate
// POST new report using JSON body with starting PollutionRate
// use only when tempPollutionRate > 0
router.post('/', (req, res, next) => {

    const clean_report = new water_pollution_log({
        _id: new mongoose.Types.ObjectId(),
        tempPollutionRate: req.body.tempPollutionRate,
        currentPollutionRate: req.body.currentPollutionRate,
        toilet: req.body.toilet
    });


    clean_report.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'log created successfully',
                water_log: {
                    tempPollutionRate: result.tempPollutionRate,
                    toilet: result.toilet,
                    currentPollutionRate: result.currentPollutionRate,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/waterPollutionLogging' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// waterPollutionLogging GET report
// get all water pollution logging
router.get('/',(req,res,next)=>{
    water_pollution_log.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                reports: docs.map(doc => {
                    return {
                        ...doc._doc,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/waterPollutionLogging' + doc._id
                        }
                    }
                    
                })
            }
            console.log(docs);
            if(docs.length >=0){
                res.status(200).json(response)            
            } else {
                res.status(404).json({
                    error: "No file found"
                })
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})


// get specific water pollution logging
router.get('/:waterPolLogId', (req,res,next)=> {
    const id = req.params.waterPolLogId;
    water_pollution_log.findById(id)
        .exec()
        .then(doc => {
            const response = {
                report: doc
            }
            console.log(doc);  
            if (doc){
                res.status(200).json(response);
            } else{
                res.status(404).json({message: 'no valid entry found for provided id'})
            }
            res.status(200).json(response);          
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

//PATCH
//Update method
router.patch('/:waterPolLogId', (req, res, next) =>{
    const id = req.params.waterPolLogId
    const updateOps = {}
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    water_pollution_log.update({_id: id},{$set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
});

// DEL method
// Deleting specific water pollution log
router.delete('/:waterPolLogId', (req, res, next) => {
    const id = req.params.waterPolLogId
    water_pollution_log.remove({_id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'report deleted'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

router.delete('/',(req,res,next)=> {
    water_pollution_log.remove()
        .exec()
        .then(()=>{
            res.status(200).json({
                message: 'all report deleted'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json ({
                error:err
            })
            
        })
})

module.exports = router;