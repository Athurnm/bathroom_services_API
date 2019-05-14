/*
 * This file is the backend of availability command (cleanCommand) services and handling all HTTP methods
 * All logic of cleanCommand services are implemented here
 * filename: bathroomCleanlinessManagement.js
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const availability_command = require('../models/availability_command')

// cleanCommand POST
/**
 * @param 
 * POST a new command using JSON body
 * to call use url: 'endpoint/cleancommand/' with POST header
 */
router.post('/', (req, res, next) => {
    const clean_command = new availability_command({
        _id: new mongoose.Types.ObjectId(),
        type: req.body.type,
        command: req.body.command,
        toilet: req.body.toilet
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
                    url: 'http://localhost:3000/cleanCommand' + result._id
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

// cleanCommand GET command
/**
 * @param 
 * GET all cleanliness command 
 * to call use url: 'endpoint/cleancommand/'
 */
router.get('/',(req,res,next)=>{
    availability_command.find()
        .select("type command toilet _id username timeStamp")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                commands: docs.map(doc => {
                    return {
                        ...doc._doc,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/cleanCommand' + doc._id
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
 * to call use url: 'endpoint/cleancommand/<objectId>'
 */
router.get('/:Id', (req,res,next)=> {
    const id = req.params.Id;
    availability_command.findById(id)
        .select('type command toilet _id')
        .exec()
        .then(doc => {
            const response = {
                count: docs.length,
                product: docs.map(doc => {
                    return {
                        ...doc._doc,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/cleanCommand' + doc._id
                        }
                    }
                    
                })
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
 * @param janitorName
 * GET specific cleanliness command (based on janitor/assignto prop)
 * to call use url: 'endpoint/cleancommand/<janitorName>'
 */
router.get('/:janitorName', (req,res,next)=> {
    const id = req.params.janitorName;
    availability_command.find({assignto: id})
        .select('type command toilet _id')
        .exec()
        .then(doc => {
            const response = {
                count: docs.length,
                product: docs.map(doc => {
                    return {
                        ...doc._doc,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/cleanCommand' + doc._id
                        }
                    }
                    
                })
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
 * @param cleanlinessId
 * Patch/update specific cleanliness command (based on ObjectId)
 * to call use url: 'endpoint/cleancommand/<cleanlinessId>'
 * with PATCH header
 */
router.patch('/:cleanlinessId', (req, res, next) =>{
    const id = req.params.cleanlinessId
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

// DEL method
/**
 * @param cleanlinessId
 * Delete specific cleanliness command (based on ObjectId)
 * to call use url: 'endpoint/cleancommand/<cleanlinessId>'
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
 * to call use url: 'endpoint/cleancommand/<cleanlinessId>'
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