const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Login = require('../models/login');

router.get('/', (req, res, next) => {
    Login.find()
    .exec()
    .then(docs => {
        console.log(docs);
        // if (docs.length >= 0) {
            res.status(200).json(docs);
        // } else {   
        //     res.status(404).json({
        //         message: 'No entries found'
        //     });
        // }
    })
    .catch(err => {        
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const login = new Login({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email
    });
    login
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling POST request to /login',
            value: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:loginID', (req, res, next) => {
    const id = req.params.loginID;
    Login.findById(id)
    .exec()
    .then(doc => {
        console.log("From database",doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No valid entry found provided ID'});
        }
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.patch('/:loginID', (req, res, next) => {
    const id = req.params.loginID;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Login.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {        
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.delete('/:loginID', (req, res, next) => {
    const id = req.params.loginID;
    Login.remove({_id: id})
    .exec()
    .then(result => {        
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
    });
});

module.exports = router;