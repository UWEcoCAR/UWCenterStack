(function() {
	var key = process.env.LAST_FM_KEY,
		secret = process.env.LAST_FM_SECRET;

	function makeRequest(params) {
		var unhashed = Object.keys(params)
			.filter(function(value) {
				return params.hasOwnProperty(value);
			})
			.sort(function(a,b) {
				return a > b;
			})
			.reduce(function(prev, curr) {
				return prev + curr + params[curr];
			}, '') + secret;

		console.log(unhashed);

		params.api_sig = require('crypto').createHash('md5', 'utf8').update(unhashed).digest('hex');
		return params;	
	}

	function getTracks(token, callback) {
		$.ajax({
			url : 'http://ws.audioscrobbler.com/2.0/',
			method : 'POST',
			data : makeRequest({
				method : 'radio.getPlaylist',
				api_key : key,
				sk : token,
				discovery : true
			}),
			success : function(data) {
				data = data.querySelectorAll('track');
				var jsonData = [];

				for(var i = 0;  i < data.length; i++) {
					jsonData.push({
						src : data[i].querySelector('location').textContent,
						data : {
							name : data[i].querySelector('title').textContent,
							album : data[i].querySelector('album').textContent,
							author : data[i].querySelector('creator').textContent,
							duration : parseInt(data[i].querySelector('duration').textContent) / 1000,
						}
					});
				}

				callback(jsonData);
			}
		});
	}

	window.LastFmSupplier = function(username, password, callback) {
		var token = null,
			queue = [];

		var self = this;

		/**
		 * Going back is not allowed for radio
		 */
		this.previous = function() {
			return null;
		};

		/**
		 * Get the next element, refill the queue if needed
		 */
		this.next = function() {
			var next = queue.shift();
			if (queue.length === 0) {
				getTracks(token, function(data) {
					queue = data;
				});
			}
			return next;
		};

		// this radio never ends, i think
		this.isDone = function() {
			return false;
		};

		// when the supplier is first created... TODO init() ?
		// authenticate user, tune into playlist, get tracks
		$.ajax({
			url : 'https://ws.audioscrobbler.com/2.0/',
			method : 'POST',
			data : makeRequest({
				'method' : 'auth.getMobileSession',
				'username' : username,
				'password' : password,
				'api_key' : key
			}),
			success : function(data) {
				token = data.querySelector('key').textContent;

				// prepare radio shit
				$.ajax({
					url : 'http://ws.audioscrobbler.com/2.0/',
					method : 'POST',
					data : makeRequest({
						method : 'radio.tune',
						api_key : key,
						sk : token,
						station : 'lastfm://user/' + username + '/recommended'
					}),
					success : function(data) {
						getTracks(token, function(data) {
							queue = data;
							callback(self);
						});				
					}
				});
			}
		});
	};
})();