(function() {

	// constructor
    var supplier = window.QueueSupplier = function(callback, array, doLoop) {
        this.queue = array || [],
        this._index = -1,
        this.loop = doLoop === undefined ? false : doLoop;

        callback();
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
        return this._getItem(++this._index) || null;
    };

    // returns the previous item if it exists
    supplier.prototype.previous = function() {
        return this._getItem(--this._index) || null;
    };
})();