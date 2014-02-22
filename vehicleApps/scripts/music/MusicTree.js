(function() {
	var id3 = require('id3js');

	var tree = window.MusicTree = function(directory, onReady) {
		this._directory = directory;
		this.tree = {};

		this._init(onReady);
	};

	tree.prototype._init = function(callback) {
		var self = this;
		FileFinder.find(this._directory, 'mp3', function(err, results) {
			if (err) callback(err);

			self._getSongData(results, function(err, results) {
				if (err) callback(err);
				self._buildTree(results, callback);
			});
		});
	};

	tree.prototype._getSongData = function(songs, callback) {
		doneFn = _.after(songs.length, callback);
		songs.forEach(function(song, index) {
			id3({
				file : song,
				type : id3.OPEN_LOCAL
			}, function(err, tags) {
				if (err) {
					callback(err);
					return;
				}
				songs[index] = {
					src : song,
					data : tags
				};
				doneFn(null, songs);
			});
		});
	};

	tree.prototype._buildTree = function(songObjects, callback) {
		var treeObject = this.tree;
		songObjects.forEach(function(value, index) {
			var artist = value.data.artist || 'unknown',
				album = value.data.album || 'unknown',
				title = value.data.title || 'unknown';

			treeObject[artist] = treeObject[artist] || {};
			treeObject[artist][album] = treeObject[artist][album] || {};
			treeObject[artist][album][title] = value;
		});

		callback(null, treeObject);
	};

})();