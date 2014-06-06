(function() {

	// constructor
    var supplier = window.QueueSupplier = function(array) {
        this.queue = array || [];
        this._index = -1;
    };

    /**
     * Returns the item at the given index
     * this is better than accessing the array directly
     * because it can handle looping around the array
     */
    supplier.prototype._getItem = function(i) {
        return this.loop ? this.queue[i % this.queue.length] : this.queue[i];
    };

    // returns the next item if it exists
    supplier.prototype.next = function() {
        this._index++;
        return this._getItem(this._index) || null;
    };

    supplier.prototype.hasNext = function() {
        return this._index + 1 < this.queue.length;
    };

    supplier.prototype.hasPrevious = function() {
        return this._index + 1 > 0;
    };

    // returns the previous item if it exists
    supplier.prototype.previous = function() {
        this._index = Math.max(this._index - 1, 0);
        return this._getItem(this._index);
    };
})();