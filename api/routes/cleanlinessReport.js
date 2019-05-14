/*
 * This file is the backend of Cleanliness Report (cleanReport) services and handling all HTTP methods
 * All logic of BCM services are implemented here
 * filename: bathroomCleanlinessManagement.js
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Cleanliness_report = require('../models/cleanliness_report')

// BCM POST
// Post new report using JSON body
router.post('/', (req, res, next) => {
    const clean_report = new Cleanliness_report({
        _id: new mongoose.Types.ObjectId(),
        type: req.body.type,
        report: req.body.report,
        toilet: req.body.toilet
    });
    clean_report.save().then(result =>{
        console.log(result);  
        res.status(201).json({
            message: 'report created successfully',
            Report_on_cleanliness: {
                type: result.type,
                report: result.report,
                toilet: result.toilet,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/cleanReport' + result._id
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

// cleanReport GET report
// get all cleanliness report
router.get('/',(req,res,next)=>{
    Cleanliness_report.find()
        .select("type report toilet _id")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                reports: docs.map(doc => {
                    return {
                        ...doc._doc,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/cleanReport' + doc._id
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

// get specific cleanliness report
router.get('/:cleanlinessId', (req,res,next)=> {
    const id = req.params.cleanlinessId;
    Cleanliness_report.findById(id)
        .select('type report toilet _id')
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

router.patch('/:cleanlinessId', (req, res, next) =>{
    const id = req.params.cleanlinessId
    const updateOps = {}
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Cleanliness_report.update({_id: id},{$set: updateOps})
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
// Deleting specific cleanliness report
router.delete('/:cleanlinessId', (req, res, next) => {
    const id = req.params.cleanlinessId
    Cleanliness_report.remove({_id: id })
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
    Cleanliness_report.remove()
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