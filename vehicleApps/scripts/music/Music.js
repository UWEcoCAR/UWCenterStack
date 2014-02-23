(function() {
	var Emitter = require('events').EventEmitter,
		music = window.Music = new Emitter(),
		currentlyPlaying = null,
		supplier = null;

	/**
	 * Takes in a song object or source string a plays it
	 * Attempts to play the next song after the song ends
	 */
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
	 * Fire and forget
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

	/**
	 * Sets the supplier
	 */
	music.setSupplier = function(newSupplier) {
		supplier = newSupplier;
	};

	/**
	 * Starts playing
	 * Throws an error if supplier isn't set
	 */
	music.start = function() {
		if (supplier) {
			this.next();
		} else {
			throw "Supplier must be set.";
		}
	};

	/**
	 * Stops the music and unsets the supplier
	 * Throws error if supplier isn't set
	 */
	music.stop = function() {
		if (supplier) {
			this.pause();
			supplier = null;
			currentlyPlaying = null;
		} else {
			throw "Supplier must be set.";
		}
	};

	/**
	 * Plays music if paused and there is one
	 * Throws error if supplier isn't set
	 */
	music.play = function() {
		if (supplier) {
			if (currentlyPlaying) {
				currentlyPlaying.element.play();
			}
		} else {
			throw "Supplier must be set.";
		}
	};

	/**
	 * Pauses the music
	 * Throws error if supplier isn't set
	 */
	music.pause = function() {
		if (supplier) {
			if (currentlyPlaying) {
				currentlyPlaying.element.pause();
			}
		} else {
			throw "Supplier must be set.";
		}
	};

	/**
	 * Attemps to the play the next song
	 * Throws error if supplier isn't set
	 */
	music.next = function(autoplay) {
		if (supplier) {
			play(supplier.next());
		} else {
			throw "Supplier must be set.";
		}
	};

	/**
	 * Attempts to play the last song
	 * Throws error if supplier isn't set
	 */
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

	/*
	 * Starts song at given time
	 * Untested... TODO
	 */
	music.seek = function(seconds) {
		if (currentlyPlaying) {
			currentlyPlaying.element.currentTime = Math.max(Math.min(seconds, currentlyPlaying.element.duration), 0);
		}
	};

	/** 
	 * Returns info about currently playing song
	 * Empty object if nothing is playing or set to play
	 */
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