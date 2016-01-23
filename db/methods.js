module.exports = function(db, params) {
    function findRests(options, callback) {
        console.log(new Date() + '', options);

        db.collection('rest')
            .find(options)
            .limit(5)
            .toArray(callback);
    }

    function coursor(id, end) {
        if (id == end) {
            db.close();
            console.log('end')
            return
        }

        var obj = params.create(id)
        var collection = db.collection('rest')

        collection.insert(obj, function(err, result) {
            console.log('Inserted ', id, ' sec: ', ((new Date).getTime() - time) / 1000)
            coursor(++id, end)
        });
    }

    var time = (new Date).getTime()

    return {
        coursor: coursor,
        findRests: findRests
    }
}
