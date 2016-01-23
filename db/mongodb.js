var url = require('../config.js').mongo
var MongoClient = require('mongodb').MongoClient;

function connect(callback) {
    return MongoClient.connect(url, callback);
}

module.exports.connect = connect
