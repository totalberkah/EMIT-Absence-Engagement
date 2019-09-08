const mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String
});

module.exports = mongoose.model('Login', loginSchema);