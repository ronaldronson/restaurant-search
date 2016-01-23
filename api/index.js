var mongodb = require('../db/mongodb')
var methods = require('../db/methods')
var express = require('express')
var bodyParser = require('body-parser')
var utils = require('./utils')

var port = require('../config').port
var app = express()
var findRests

app.use(express.static(__dirname + '/../demo'))

app.use(bodyParser());

app.post('/restaurants', function(req, res) {
    findRests(utils.buildOptions(req.body), function(err, resp) {
        res.send(resp)
    })
})

mongodb.connect(function(err, db) {
    if (!err) {
        findRests = methods(db).findRests
        app.listen(port)
    }
    console.log(err || 'Listening on port ' + port + '...')
})
