(function() {
	window.QueueSupplier = function(array, doLoop, callback) {
		var queue = array,
			index = -1,
			loop = doLoop;

		function getItem(i) {
			return loop ? queue[i % queue.length] : queue[i];
		}

		this.queue = queue;

		this.next = function() {
			return getItem(++index) || null;
		};

		this.isDone = function() {
			return !getItem(index + 1);
		};

		this.previous = function() {
			return getItem(--index) || null;
		};
	};
})();