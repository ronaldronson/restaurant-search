;(function ($, w, undefined) {

    var request = {}
    var restCnt = {}
    var tpl

    function update(key, value) {
        key && (request[key] = value)
        console.log(prepareRequest(request))
        $.post('/restaurants', prepareRequest(request), renderRests)
    }

    function renderRests(rests) {
        restCnt.empty()
        rests.forEach(function (obj) {
            restCnt.append(template(tpl, obj))
        })
    }

    function prepareRequest(obj) {
        var data = obj.filters
        data.search = obj.search
        data.postcode = obj.postcode

        return Object.keys(data).reduce(function (agr, key) {
            !!data[key] && (agr[key] = data[key])
            return agr
        }, {})
    }

    function serialise(elems) {
        return elems.serializeArray().reduce(function (agr, obj) {
            agr[obj.name]
                ? agr[obj.name].push(obj.value)
                : agr[obj.name] = [obj.value]

            return agr
        }, {})
    }

    function template(tpl, opt) {
        return Object.keys(opt).reduce(function (str, name) {
            return str.replace(new RegExp('{{' + name + '}}', 'g'), opt[name])
        }, tpl)
    }

    $(function () {

        var search = $('#search-suggest')
        var postcode = $('#postcode-field')
        var filters = $('.searchFilters [type="checkbox"]')

        restCnt = $('#restsSearchResultsList')
        tpl = $('#rest-template').get(0).innerHTML

        request = {
            filters: filters.serializeArray(),
            postcode: postcode.val(),
            search: search.val()
        }

        update()

        filters.on('change', function() {
            update('filters', serialise(filters))
        })

        postcode.on('change', function() {
            update('postcode', postcode.val())
        })

        search.on('keyup', function() {
            update('search', search.val())
        })

        $('#search-form').on('submit', function() {
            update('search', search.val())
            return false
        })
    })

}(jQuery, this))
