const db = require('./mongo-connection');

const mongoose = require('mongoose');
const uuid = require('uuid/v4');

const userSchema = new mongoose.Schema({
    user_id: {type: String, index: true, unique: true, required: true, default: uuid},
    f_name: {type: String, required: true},
    l_name: {type: String, required: true},
    email: {type: String, required: true},
    sso: {type: String, required: true}
});

module.exports = db.model('User', userSchema);