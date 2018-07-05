const expect = require('chai').expect;
const nock = require('nock');
const tax = require('../part1/tax');
describe('tax', function() {
    it('calculate() should resolve with an object containing the tax details', function(cb) {

        nock('https://some-tax-service.com').post('/request').reply(200, { amount: 7 });

        tax.calculate(500, 'CA', function(taxDetails) {
            expect(taxDetails).to.eql({amount: 7});
            cb();
        });
    });

    it('calculate() should send the subtotal in the request', function(done) {
        nock('https://some-tax-service.com')
          .post('/request')
          .reply(200, function(uri, requestBody) {
            return {
                amount: requestBody.subtotal * 0.10
            };
          });

        tax.calculate(100, 'CA', function(taxDetails) {
            expect(taxDetails).to.eql({ amount: 10 });
            done();
        });
    });

    it('calculate() should not make a request if the state is not CA', function(cb) {
        nock('https://some-tax-service.com')
            .post('/request')
            .reply(200, function(uri, requestBody) {
                return { amount: requestBody.subtotal * 0.10 }
            });

        tax.calculate(100, 'NY', function(taxDetails) {
            expect(taxDetails).to.eql({ amount: 0 });
            cb();
        });
    })
})