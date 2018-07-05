var request = require('request');

module.exports = {
    calculate: function(subtotal, state, cb) {

        if (state !== 'CA') {
            return cb({ amount: 0 });
        }

        request.post({
            url: 'https://some-tax-service.com/request',
            method: 'POST',
            json: {
                subtotal: subtotal
            }
        }, function(error, response, body) {
            cb(body);
        })
    }
}