/*
 * This file is the backend of bathroom availability management (availabilityManagement) services and handling all HTTP methods
 * All logic of bathroom availability management services are implemented here
 * filename: availabilityManagement.js
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Availability_management = require('../models/availability_management')

// Adding new starting capacity
// POST new report using JSON body with starting capacity
// use only when toilet > 0
router.post('/', (req, res, next) => {
    const clean_report = new Availability_management({
        _id: new mongoose.Types.ObjectId(),
        toilet: req.body.toilet, 
        availableTime: req.body.availableTime,
        isAvailable: req.body.isAvailable
    });


    clean_report.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'log created successfully',
                water_log: {
                    toilet: result.toilet,
                    availableTime: result.availableTime,
                    isAvailable: result.isAvailable,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/availabilityManagement' + result._id
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

// availabilityManagement GET report
// get all bathroom availability management
router.get('/', (req, res, next) => {
    Availability_management.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                reports: docs.map(doc => {
                    return {
                        ...doc._doc,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/availabilityManagement' + doc._id
                        }
                    }

                })
            }
            console.log(docs);
            if (docs.length >= 0) {
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

// get specific bathroom availability management
router.get('/:toiletId', (req, res, next) => {
    const id = req.params.toilet;
    Availability_management.findOne({toilet: id})
        .exec()
        .then(doc => {
            const response = {
                report: doc
            }
            console.log(doc);
            if (doc) {
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: 'no valid entry found for provided id'
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//PATCH
//Update method
router.patch('/:toiletId', (req, res, next) => {
    const id = req.params.toiletId
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Availability_management.update({
            _id: id
        }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

// DEL method
// Deleting specific water usage log
router.delete('/:toiletId', (req, res, next) => {
    const id = req.params.toiletId
    Availability_management.remove({
            _id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'availability deleted'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

router.delete('/', (req, res, next) => {
    Availability_management.remove()
        .exec()
        .then(() => {
            res.status(200).json({
                message: 'all report deleted'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })

        })
})

module.exports = router;