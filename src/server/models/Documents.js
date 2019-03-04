const db = require('./mongo-connection');

const mongoose = require('mongoose');
const uuid = require('uuid/v4');

const documentSchema = new mongoose.Schema({
    document_id: {type: String, index: true, unique: true, required: true, default: uuid},
    file_name: {type: String, required: true},
    file_id: {type: String, required: true, default: uuid},
    type: {type: String, required: true},
    desc: {type: String, required: false}
});

module.exports = db.model('Document', documentSchema);
