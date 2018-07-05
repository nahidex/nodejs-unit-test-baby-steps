function CartSummary(items) {
    this._items = items;
}

CartSummary.prototype.getSubTotal = function() {
    if(this._items.length) {
        return this._items.reduce(function(subtotal, item) {
            return subtotal += (item.quantity * item.price);
        }, 0);
    }

    return 0;
}

module.exports = CartSummary;
