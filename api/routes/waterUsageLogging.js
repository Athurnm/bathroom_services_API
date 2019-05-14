/*
 * This file is the backend of water usage logging (waterUsageLogging) services and handling all HTTP methods
 * All logic of water usage logging services are implemented here
 * filename: waterUsageLogging.js
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Water_usage_log = require('../models/water_usage_log')


// Calculate capacity
const usageCalculation = (startingCapacity, currentCapacity) => {
    const result = startingCapacity - currentCapacity
    return result
}

// Adding new starting capacity
// POST new report using JSON body with starting capacity
router.post('/start', (req, res, next) => {
    const usage = usageCalculation(req.body.currentCapacity, req.body.currentCapacity)
    
    const clean_report = new Water_usage_log({
        _id: new mongoose.Types.ObjectId(),
        currentCapacity: req.body.currentCapacity,
        usageCapacity: usage
    });
    
    
    clean_report.save().then(result =>{
        console.log(result);  
        res.status(201).json({
            message: 'log created successfully',
            water_log: {
                tempCapacity: result.tempCapacity,
                usageCapacity: result.usageCapacity,
                currentCapacity: result.currentCapacity,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/waterUsageLogging' + result._id
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

// Adding new starting capacity
// POST new report using JSON body with starting capacity
// use only when tempCapacity > 0
router.post('/', (req, res, next) => {
    let usage = usageCalculation(req.body.tempCapacity, req.body.currentCapacity)

    if (usage <= 0){
        usage = 0
    }

    const clean_report = new Water_usage_log({
        _id: new mongoose.Types.ObjectId(),
        tempCapacity: req.body.tempCapacity,
        currentCapacity: req.body.currentCapacity,
        usageCapacity: usage
    });


    clean_report.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'log created successfully',
                water_log: {
                    tempCapacity: result.tempCapacity,
                    usageCapacity: result.usageCapacity,
                    currentCapacity: result.currentCapacity,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/waterUsageLogging' + result._id
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

// waterUsageLogging GET report
// get all water usage logging
router.get('/',(req,res,next)=>{
    Water_usage_log.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                reports: docs.map(doc => {
                    return {
                        ...doc._doc,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/waterUsageLogging' + doc._id
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

// waterUsageLogging GET total usage
router.get('/totalUsage',(req,res,next)=>{
    Water_usage_log
        .aggregate([{
            $group: {
                _id: null,
                total: {$sum: "$usageCapacity"}
            }
        }])
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length >= 0) {
                res.status(200).json(docs)
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

// get specific water usage logging
router.get('/:waterUsageLogId', (req,res,next)=> {
    const id = req.params.waterUsageLogId;
    Water_usage_log.findById(id)
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
router.patch('/:waterUsageLogId', (req, res, next) =>{
    const id = req.params.waterUsageLogId
    const updateOps = {}
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Water_usage_log.update({_id: id},{$set: updateOps})
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
// Deleting specific water usage log
router.delete('/:waterUsageLogId', (req, res, next) => {
    const id = req.params.waterUsageLogId
    Water_usage_log.remove({_id: id })
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
    Water_usage_log.remove()
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