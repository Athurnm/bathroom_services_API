/*
 * This file is the backend of availability report (availabilityreport) services and handling all HTTP methods
 * All logic of availabilityreport services are implemented here
 * filename: availabilityReport.js
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const availability_report = require('../models/availability_report')

// availabilityreport POST
/**
 * @param 
 * POST a new report for cleaning using JSON body
 * to call use url: 'endpoint/availabilityreport/' with POST header
 * and use JSON body with following format:
 *  {
 *      "report": <report for cleaning>
 *      "toilet" : <toilet_id>
 *      "solved" : <has been solved or not>
 *  }
 */
router.post('/', (req, res, next) => {
    const clean_report = new availability_report({
        _id: new mongoose.Types.ObjectId(),
        report: req.body.report,
        toilet: req.body.toilet,
        assignto: req.body.assignto
    });
    clean_report.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'report created successfully',
                report_on_cleanliness: {
                    type: result.type,
                    report: result.report,
                    toilet: result.toilet,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/availabilityReport' + result._id
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

// availabilityReport GET report
/**
 * @param 
 * GET all cleanliness report 
 * to call use url: 'endpoint/availabilityReport/'
 */
router.get('/', (req, res, next) => {
    availability_report.find()
        .select("type report toilet _id username timeStamp")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                reports: docs.map(doc => {
                    return {
                        ...doc._doc,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/availabilityReport' + doc._id
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

/**
 * @param objectId
 * GET specific cleanliness report (based on Id)
 * to call use url: 'endpoint/availabilityReport/<objectId>'
 */
router.get('/:Id', (req, res, next) => {
    const id = req.params.Id;
    availability_report.findById(id)
        .select('type report toilet _id')
        .exec()
        .then(doc => {
            const response = doc
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
 * @param janitorName
 * GET specific cleanliness report (based on janitor/assignto prop)
 * to call use url: 'endpoint/availabilityReport/<janitorName>'
 */
router.get('/:janitorName', (req, res, next) => {
    const id = req.params.janitorName;
    availability_report.find({
            assignto: id
        })
        .select('type report toilet _id solved')
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

/**
 * @param janitorName @param hasSolved
 * GET specific cleanliness report (based on janitor/assignto and solved parameter)
 * to call use url: 'endpoint/availabilityReport/<janitorName>'
 */
router.get('/:janitorName/:hasSolved', (req, res, next) => {
    const id = req.params.janitorName
    const solved = req.params.hasSolved
    availability_report.find({
            assignto: id,
            solved: solved
        })
        .select('type report toilet _id solved')
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

/**
 * PATCH / UPDATE record value
 * @param availabilityID
 * Patch/update specific cleanliness report (based on ObjectId)
 * to call use url: 'endpoint/availabilityReport/<availabilityID>'
 * with PATCH header
 * body is in JSON with following format:
 *  [
 *      {
 *          "propName": "propValue"
 *      }
 *  ]
 */
router.patch('/:availabilityID', (req, res, next) => {
    const id = req.params.availabilityID
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    availability_report.update({
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

/**
 * UPDATE to make report SOLVED TRUE
 * @param availabilityID
 * Patch/update specific cleanliness report (based on ObjectId)
 * to call use url: 'endpoint/availabilityReport/<availabilityID>/<true/false>'
 * with PATCH header
 */
router.patch('/:availabilityID/:hasSolved', (req, res, next) => {
    const id = req.params.availabilityID
    const hasSolved = req.params.hasSolved
    const updateOps = {
        solved: hasSolved
    }
    availability_report.update({
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
 * Delete specific cleanliness report (based on ObjectId)
 * to call use url: 'endpoint/availabilityReport/<cleanlinessId>'
 * with DEL header
 */
router.delete('/:cleanlinessId', (req, res, next) => {
    const id = req.params.cleanlinessId
    availability_report.remove({
            _id: id
        })
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

/**
 * @param cleanlinessId
 * Delete all cleanliness report
 * to call use url: 'endpoint/availabilityReport/'
 * with DEL header
 */
router.delete('/', (req, res, next) => {
    availability_report.remove()
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