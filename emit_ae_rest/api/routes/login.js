const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /login'
    });
});

router.post('/', (req, res, next) => {
    const login = {
        name = req.body.name,
        email = req.body.email
    }
    res.status(201).json({
        message: 'Handling POST request to /login',
        createdLogin: login
    });
});

router.get('/:loginID', (req, res, next) => {
    const id = req.params.loginID;
    if (id === 'special'){
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:loginID', (req, res, next) => {
    res.status(200).json({
        message: 'Updated login!'
    });
});

router.delete('/:loginID', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted login!'
    });
});

module.exports = router;