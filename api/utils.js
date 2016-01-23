function custType(arr) {
    return arr.map(function (val) {
        return val|0
    })
}

function buildOptions(options) {
    var ints = ['price']
    return Object.keys(options).reduce(function (agr, key) {
        if (key == 'search') {
            agr['name'] = new RegExp('^' + options[key], 'i')
        } else {
            !!~ints.indexOf(key) && (options[key] = custType(options[key]))
            agr[key] = Array.isArray(options[key])
                ? {$in: options[key]}
                : options[key]
        }
        return agr
    }, {})
}

module.exports = {
    buildOptions: buildOptions
}
