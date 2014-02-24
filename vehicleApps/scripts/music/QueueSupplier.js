(function() {
    var supplier = window.QueueSupplier = function(callback, array, doLoop) {
        this.queue = array || [],
        this._index = -1,
        this.loop = doLoop === undefined ? false : doLoop;

        callback();
    };

    supplier.prototype._getItem = function(i) {
        return this.loop ? this.queue[i % this.queue.length] : this.queue[i];
    };

    supplier.prototype.next = function() {
        return this._getItem(++this._index) || null;
    };

    supplier.prototype.isDone = function() {
        return !this._getItem(this._index + 1);
    };

    supplier.prototype.previous = function() {
        return this._getItem(--this._index) || null;
    };
})();