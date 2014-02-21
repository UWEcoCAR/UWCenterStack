(function() {
	var Emitter = require('events').EventEmitter,
		music = window.Music = new Emitter(),
		currentlyPlaying = null,
		supplier = null;

	function play(song) {
		if (currentlyPlaying) { 
			music.pause();
		}
		if (song) {
			var playing = {
				src : song.src || song,
				data : song.data || null,
				element : new Audio()
			};

			$(playing.element)
				.on('canplay', function() {
					this.play();
				})
				.on('error abort ended', function() {
					play(supplier.next());
				})
				.on('canplay timeupdate waiting playing abort ended pause', function(evt) {
					music.emit(evt.type, music.getInfo());
				});

			playing.element.src = playing.src;
			currentlyPlaying = playing;
		}
	}

	/**
	 * Fire and forget type playing 
	 * Useful for notifications or sounds that need to be layered over other sounds
	 */
	music.playOver = function(url, volume) {
		var audio = new Audio();
		$(audio)
			.on('canplaythrough', function() {
				this.play();
			});

		audio.volume = volume === undefined ? 1 : volume;
		audio.src = url;
	};

	music.setSupplier = function(newSupplier) {
		supplier = newSupplier;
	};

	music.start = function() {
		if (supplier) {
			this.next();
		} else {
			throw "Supplier must be set.";
		}
	};

	music.stop = function() {
		if (supplier) {
			this.pause();
			supplier = null;
			currentlyPlaying = null;
		} else {
			throw "Supplier must be set.";
		}
	};

	music.play = function() {
		if (supplier) {
			if (currentlyPlaying) {
				currentlyPlaying.element.play();
			}
		} else {
			throw "Supplier must be set.";
		}
	};

	music.pause = function() {
		if (supplier) {
			if (currentlyPlaying) {
				currentlyPlaying.element.pause();
			}
		} else {
			throw "Supplier must be set.";
		}
	};

	music.next = function(autoplay) {
		if (supplier) {
			if (!supplier.isDone()) {
				play(supplier.next());
			}
		} else {
			throw "Supplier must be set.";
		}
	};

	music.previous = function(autoplay) {
		if (supplier) {
			if (currentlyPlaying && currentlyPlaying.element.currentTime > 3) {
				currentlyPlaying.element.currentTime = 0;
				currentlyPlaying.element.play();
			} else {
				play(supplier.previous());
			}
		} else {
			throw "Supplier must be set.";
		}
	};

	music.seek = function(seconds) {
		if (currentlyPlaying) {
			currentlyPlaying.element.currentTime = Math.max(Math.min(seconds, currentlyPlaying.element.duration), 0);
		}
	};

	music.getInfo = function() {
		return !currentlyPlaying ? {} : {
			src : currentlyPlaying.src,
			time : currentlyPlaying.element.currentTime,
			duration : currentlyPlaying.element.duration,
			data : currentlyPlaying.data,
			isPlaying : currentlyPlaying.element.playing
		};
	};

})();