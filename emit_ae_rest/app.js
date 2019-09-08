const express = require('express');
const app = express();
const morgan = require('morgan');

// Handle incoming request
const loginRoutes = require('./api/routes/login');

app.use(morgan('dev'));

// Routes
app.use('/login', loginRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;