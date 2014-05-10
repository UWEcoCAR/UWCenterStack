(function() {
    var util = require('util'),
        events = require('events'),
        currentlyPlaying = null,
        supplier = null;

    function Music() {
        events.EventEmitter.call(this);
    }
    util.inherits(Music, events.EventEmitter);



    /**
     * Takes in a song object or source string and plays it
     * Attempts to play the next song after the song ends
     */
    Music.prototype._play = function(song) {
        var self = this;
        if (currentlyPlaying) { 
            music.pause();
        }
        if (song) {
            var playing = {
                model: song,
                element : new Audio()
            };

            $(playing.element)
                .on('canplay', function() {
                    this.play();
                })
                .on('error abort ended', function() {
                    music._play(supplier.next());
                })
                .on('canplay timeupdate waiting playing abort ended pause', function(evt) {
                    music.emit(evt.type, music.getInfo());
                });

            playing.element.src = playing.model.get('src');
            currentlyPlaying = playing;
            currentTrack.set('name', currentlyPlaying.model.get('name'));
            currentTrack.set('image', currentlyPlaying.model.get('image'));
            currentTrack.set('artistName', currentlyPlaying.model.get('artistName'));
            currentTrack.set('isPlaying', 'play');
        }
    };

    /**
     * Fire and forget
     * Useful for notifications or sounds that need to be layered over other sounds
     */
    Music.prototype.playOver = function(url, volume) {
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
    Music.prototype.setSupplier = function(newSupplier) {
        if (newSupplier && typeof newSupplier.next === 'function' && typeof newSupplier.previous === 'function') {
            supplier = newSupplier;
        } else {
            throw "Invalid supplier.";
        }
    };

    /**
     * Starts playing
     * Throws an error if supplier isn't set
     */
    Music.prototype.start = function() {
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
    Music.prototype.stop = function() {
        if (supplier) {
            this.pause();
            supplier = null;
            currentlyPlaying = null;
            currentTrack.set('isPlaying', false);
        } else {
            throw "Supplier must be set.";
        }
    };

    /**
     * Plays music if paused and there is one
     * Throws error if supplier isn't set
     */
    Music.prototype.play = function() {
        if (supplier) {
            if (currentlyPlaying) {
                currentlyPlaying.element.play();
            }
            currentTrack.set('isPlaying', 'play');
        } else {
            throw "Supplier must be set.";
        }
    };

    /**
     * Pauses the music
     * Throws error if supplier isn't set
     */
    Music.prototype.pause = function() {
        if (supplier) {
            if (currentlyPlaying) {
                currentlyPlaying.element.pause();
            }
            currentTrack.set('isPlaying', 'pause');
        } else {
            throw "Supplier must be set.";
        }
    };

    /**
     * Attemps to the play the next song
     * Throws error if supplier isn't set
     */
    Music.prototype.next = function(autoplay) {
        if (supplier) {
            music._play(supplier.next());
        } else {
            throw "Supplier must be set.";
        }
    };

    /**
     * Attempts to play the last song
     * Throws error if supplier isn't set
     */
    Music.prototype.previous = function(autoplay) {
        if (supplier) {
            if (currentlyPlaying && currentlyPlaying.element.currentTime > 3) {
                currentlyPlaying.element.currentTime = 0;
                currentlyPlaying.element.play();
            } else {
                music._play(supplier.previous());
            }
        } else {
            throw "Supplier must be set.";
        }
    };

    /*
     * Starts song at given time
     * Untested... TODO
     */
    Music.prototype.seek = function(seconds) {
        if (currentlyPlaying) {
            currentlyPlaying.element.currentTime = Math.max(Math.min(seconds, currentlyPlaying.element.duration), 0);
        }
    };

    /** 
     * Returns info about currently playing song
     * Empty object if nothing is playing or set to play
     */
    Music.prototype.getInfo = function() {
        return !currentlyPlaying ? {} : {
            src : currentlyPlaying.src,
            time : currentlyPlaying.element.currentTime,
            duration : currentlyPlaying.element.duration,
            data : currentlyPlaying.data,
            isPlaying : currentlyPlaying.element.playing
        };
    };

    window.currentTrack = new TrackModel({name: '', image: '', artistName: '', isPlaying: false});
    var music = window.Music = new Music(currentTrack);

})();