(function() {
    var currentlyPlaying = null,
        supplier = null,
        vent = this.vent = _.extend({}, Backbone.Events),
        volume = 0.5;

    function Music() {}

    /**
     * Takes in a song object or source string and plays it
     * Attempts to play the next song after the song ends
     */
    Music.prototype._play = function(song) {
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
                    music._next();
                })
                .on('canplay timeupdate waiting playing abort ended pause', function(evt) {
                    vent.trigger(evt.type, music.getTrack());
                });

            playing.element.src = playing.model.get('src');
            playing.element.volume = volume;
            currentlyPlaying = playing;
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
            this._next();
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
        } else {
            throw "Supplier must be set.";
        }
    };

    /**
     * Attemps to the play the next song
     * Throws error if supplier isn't set
     */
    Music.prototype.next = function() {
        if (supplier) {
            vent.trigger('ended', music.getTrack());
            this._next();
        } else {
            throw "Supplier must be set.";
        }
    };

    /**
     * Attemps to the play the next song
     * Throws error if supplier isn't set
     */
    Music.prototype._next = function() {
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
     * Returns the vent where music events will be fired.
     */
    Music.prototype.getVent = function() {
        return vent;
    };

    /** 
     * Returns info about currently playing song
     * Empty object if nothing is playing or set to play
     */
    Music.prototype.getTrack = function() {
        return currentlyPlaying;
    };

    /**
     * Returns true if there is currently a song being played
     * @returns {boolean}
     */
    Music.prototype.isPlaying = function() {
        return currentlyPlaying ? !currentlyPlaying.element.paused : false;
    };

    /**
     * Sets the volume output level of the current track and all future tracks
     * @param newVolume Range from 0 to 1
     */
    Music.prototype.setVolume = function(newVolume) {
        if (!newVolume) {
            return;
        }

        volume = newVolume;

        if (currentlyPlaying) {
            currentlyPlaying.element.volume = volume;
        }
    };

    var music = window.Music = new Music();

})();