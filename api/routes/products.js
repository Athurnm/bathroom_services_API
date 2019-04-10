const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product')

//POST and GET HTML methods for acquiring product and input product list
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result =>{
        console.log(result);  
        res.status(201).json({
            message: 'POST method on /products succeed',
            createdProduct: product
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:productId', (req,res,next)=> {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);  
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'no valid entry found for provided id'})
            }
            res.status(200).json(doc);          
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:productId', (req, res, next) =>{
    res.status(200).json({
        message: 'updated product!'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    });
});

module.exports = router;