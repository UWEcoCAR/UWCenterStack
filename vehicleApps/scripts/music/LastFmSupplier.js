(function() {
	var key = process.env.LAST_FM_KEY,
		secret = process.env.LAST_FM_SECRET,
		crypto = require('crypto');
	
	/**
	 * SupplierClass
	 * 
	 * Optional username and password providing they're set in the
	 * environment
	 *
	 * TODO fetched playlists have a set duration for when they can be used,
	 *		keep track of that and refresh playlist when needed
	 */
	var supplier = window.LastFmSupplier = function(callback, username, password) {
		this.token = null;
		this.queue = [];
		this._username = username || process.env.LAST_FM_USERNAME;
		this._password = password || process.env.LAST_FM_PASSWORD;

		this._init(callback);
	};

	/**
	 * Initialize the object by getting authentication,
	 * tuning into recomended radio, and getting tracks
	 */
	supplier.prototype._init = function(callback) {
		var self = this;

		// when the supplier is first created... TODO init() ?
		// authenticate user, tune into playlist, get tracks
		$.ajax({
			url : 'https://ws.audioscrobbler.com/2.0/',
			method : 'POST',
			data : self._makeRequest({
				'method' : 'auth.getMobileSession',
				'username' : self._username,
				'password' : self._password,
				'api_key' : key
			}),
			success : function(data) {
				self.token = data.querySelector('key').textContent;

				// prepare radio shit
				$.ajax({
					url : 'http://ws.audioscrobbler.com/2.0/',
					method : 'POST',
					data : self._makeRequest({
						method : 'radio.tune',
						api_key : key,
						sk : self.token,
						station : 'lastfm://user/' + self._username + '/recommended'
					}),
					success : function(data) {
						self._getTracks(function(error, data) {
							self.queue = data;
							callback(error, data);
						});				
					},
					error : function(xhr, error) {
						callback(error);
					}
				});
			},
			error : function(xhr, error) {
				callback(error);
			}
		});
	};

	/**
	 * Creates an api_sig based off your parameters as specified
	 * in section 4 of http://www.last.fm/api/mobileauth
	 */
	supplier.prototype._makeRequest = function(params) {
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

		params.api_sig = crypto.createHash('md5', 'utf8').update(unhashed).digest('hex');
		return params;	
	};

	/**
	 * Fetches recent tracks from most current playlist
	 * http://www.last.fm/api/radio
	 */
	supplier.prototype._getTracks = function(callback) {
		var self = this;

		$.ajax({
			url : 'http://ws.audioscrobbler.com/2.0/',
			method : 'POST',
			data : self._makeRequest({
				method : 'radio.getPlaylist',
				api_key : key,
				sk : self.token,
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

				callback(null, jsonData);
			},
			error : function(xhr, error) {
				callback(error);
			}
		});
	};


	/**
	 * Going back is not allowed for radio
	 */
	supplier.prototype.previous = function() {
		return null;
	};

	/**
	 * Get the next element, refill the queue if needed
	 */
	supplier.prototype.next = function() {
		var self = this;

		var next = self.queue.shift();
		if (self.queue.length === 0) {
			self._getTracks(function(error, data) {
				self.queue = data;
			});
		}
		return next;
	};

	/**
	 *  this radio never ends, i think
	 */ 
	supplier.prototype.isDone = function() {
		return false;
	};

})();