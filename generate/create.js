function round(max) { return (Math.random() * max) | 0 }

module.exports = function (structure, defaults) {

    function randArr(key, num) {
        return Array.apply(null, {length: round(num)})
            .map(function () {
                return defaults[key][round(defaults[key].length)]
            })
    }

    function get(id, key) {
        if ('id' == key) return id
        if ('distance' == key) return round(defaults[key])
        if ('img' == key) return defaults[key].replace('<id>', id)
        if ('postcode' == key) return randArr(key, 20)
        if ('cuisines' == key) return randArr(key, 5)

        return defaults[key][round(defaults[key].length)]
    }

    return function create(id) {
        return Object.keys(structure).reduce(function (obj, key) {
            obj[key] = get(id, key)
            return obj
        }, {})
    }
}
