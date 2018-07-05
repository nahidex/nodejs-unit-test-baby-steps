const expect = require('chai').expect;
const CartSummary = require('./cartSummary');
const tax = require('./tax');


describe('CartSummary', function() {
    it('getSubTotal() should retunr 0 if no items are passed in', function() {
        const cartSummary = new CartSummary([]);
        expect(cartSummary.getSubTotal()).to.equal(0);
    });


    it('getSubTotal() should return the sum of the price * quantity for all items', function() {
        const cartSummary = new CartSummary([{
            id: 1,
            quantity: 4,
            price: 50
          }, {
            id: 2,
            quantity: 2,
            price: 30
          }, {
            id: 3,
            quantity: 1,
            price: 40
          }]);

          expect(cartSummary.getSubTotal()).to.equal(300);
    });

    // Stubbing
    it('getTax() should execute the callback function with the tax amount', function(cb){
        const cartSummary = new CartSummary([{
            id: 1,
            quantity: 4,
            price: 50
          }, {
            id: 2,
            quantity: 2,
            price: 30
          }, {
            id: 3,
            quantity: 1,
            price: 40
          }]);

          const taxCalculateStub = this.sandbox.stub(tax, 'calculate').callsFake(function (subTotal, state, done) {
            setTimeout(function() {
                done({
                    amount: 30
                });
            }, 200);
          });

        cartSummary.getTax('NY', function(taxAmount) {
            expect(taxAmount).to.equal(30);
            expect(tax.calculate.getCall(0).args[0]).to.equal(300);
            expect(tax.calculate.getCall(0).args[1]).to.equal('NY');
            cb(); // asnyc test
        });
    })
});