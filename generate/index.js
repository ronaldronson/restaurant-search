var mongodb = require('../db/mongodb')
var methods = require('../db/methods')

var structure = require('./schema.js')
var defaults = require('./defaults.js')

var create = require('./create.js')(structure, defaults)

var count = process.argv[2] | 0

mongodb.connect(function(err, db) {
    methods(db, {create: create}).coursor(0, count)
})
