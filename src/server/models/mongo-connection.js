const mongoose = require('mongoose');

let mongoUri = process.env.MONGO_URI;
let mongoOptions = process.env.MONGO_OPTIONS;

if(!mongoUri || mongoUri===null) {
    mongoUri = 'mongodb://localhost/assignment20';
    mongoOptions = mongoOptions || { keepAlive: true, keepAliveInitialDelay: 300000, useNewUrlParser: true };
}

mongoose.set('useCreateIndex', true);

module.exports = mongoose.createConnection(mongoUri, mongoOptions || {});