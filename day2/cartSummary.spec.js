const expect = require('chai').expect;
const CartSummary = require('./cartSummary');

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
});