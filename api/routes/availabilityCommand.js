/*
 * This file is the backend of availability command (availabilityCommand) services and handling all HTTP methods
 * All logic of availabilityCommand services are implemented here
 * filename: availabilityCommand.js
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const availability_command = require('../models/availability_command')

// availabilityCommand POST
/**
 * @param 
 * POST a new command for cleaning using JSON body
 * to call use url: 'endpoint/availabilityCommand/' with POST header
 * and use JSON body with following format:
 *  {
 *      "command": <command for cleaning>
 *      "toilet" : <toilet_id>
 *      "solved" : <has been solved or not>
 *  }
 */
router.post('/', (req, res, next) => {
    const clean_command = new availability_command({
        _id: new mongoose.Types.ObjectId(),
        command: req.body.command,
        toilet: req.body.toilet,
        assignto: req.body.assignto
    });
    clean_command.save().then(result =>{
        console.log(result);  
        res.status(201).json({
            message: 'command created successfully',
            command_on_cleanliness: {
                type: result.type,
                command: result.command,
                toilet: result.toilet,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/availabilityCommand' + result._id
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

// availabilityCommand GET command
/**
 * @param 
 * GET all cleanliness command 
 * to call use url: 'endpoint/availabilityCommand/'
 */
router.get('/',(req,res,next)=>{
    availability_command.find()
        .select("type command toilet _id username timeStamp solved")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                commands: docs.map(doc => {
                    return {
                        ...doc._doc,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/availabilityCommand' + doc._id
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

/**
 * @param objectId
 * GET specific cleanliness command (based on Id)
 * to call use url: 'endpoint/availabilityCommand/<objectId>'
 */
router.get('/:Id', (req,res,next)=> {
    const id = req.params.Id;
    availability_command.findById(id)
        .select('type command toilet _id solved assignto')
        .exec()
        .then(doc => {
            const response = doc
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

/**
 * @param janitorName
 * GET specific cleanliness command (based on janitor/assignto prop)
 * to call use url: 'endpoint/availabilityCommand/<janitorName>'
 */
router.get('/assigned/:janitorName', (req,res,next)=> {
    const id = req.params.janitorName;
    availability_command.find({assignto: id})
        .select('type command toilet _id solved')
        .exec()
        .then(doc => {
            const response = {
                command: doc
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

/**
 * @param engineerName @param hasSolved
 * GET specific cleanliness command (based on engineer/assignto and solved parameter)
 * to call use url: 'endpoint/availabilityCommand/<engineerName>'
 */
router.get('/assigned/:engineerName/:hasSolved', (req, res, next) => {
    const id = req.params.engineerName
    const solved = req.params.hasSolved
    availability_command.find({
            assignto: id, solved: solved
        })
        .select('type command toilet _id solved')
        .exec()
        .then(doc => {
            const response = {
                command: doc
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

/**
 * PATCH / UPDATE record value
 * @param availabilityID
 * Patch/update specific cleanliness command (based on ObjectId)
 * to call use url: 'endpoint/availabilityCommand/<availabilityID>'
 * with PATCH header
 * body is in JSON with following format:
 *  [
 *      {
 *          "propName": "propValue"
 *      }
 *  ]
 */
router.patch('/:availabilityID', (req, res, next) =>{
    const id = req.params.availabilityID
    const updateOps = {}
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    availability_command.update({_id: id},{$set: updateOps})
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

/**
 * UPDATE to make command SOLVED TRUE
 * @param availabilityID
 * Patch/update specific cleanliness command (based on ObjectId)
 * to call use url: 'endpoint/availabilityCommand/<availabilityID>'
 * with PATCH header
 */
router.patch('/:availabilityID/:hasSolved', (req, res, next) => {
    const id = req.params.availabilityID
    const hasSolved = req.params.hasSolved
    const updateOps = {solved: hasSolved}
    availability_command.update({
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
/**
 * @param cleanlinessId
 * Delete specific cleanliness command (based on ObjectId)
 * to call use url: 'endpoint/availabilityCommand/<cleanlinessId>'
 * with DEL header
 */
router.delete('/:cleanlinessId', (req, res, next) => {
    const id = req.params.cleanlinessId
    availability_command.remove({_id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'command deleted'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

/**
 * @param cleanlinessId
 * Delete all cleanliness command
 * to call use url: 'endpoint/availabilityCommand/'
 * with DEL header
 */
router.delete('/',(req,res,next)=> {
    availability_command.remove()
        .exec()
        .then(()=>{
            res.status(200).json({
                message: 'all command deleted'
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