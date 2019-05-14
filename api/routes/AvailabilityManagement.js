/*
 * This file is the backend of bathroom availability management (BAM) services and handling all HTTP methods
 * All logic of BAM services are implemented here
 * filename: bathroomAvailabilityManagement.js
 */

const express = require('express'); //use express library to handle routing
const router = express.Router(); //instatiate router object

// Dibawah diubah ya sesuai kebutuhan
// Handle incoming GET request to /orders
router.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'orders were fetched'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Order was created',
        createdOrder: order
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order details',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order deleted',
        orderId: req.params.orderId
    });
});

module.exports = router;