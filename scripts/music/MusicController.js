var MusicController = Marionette.Controller.extend({
    initialize: function() {
        this.volume = 0.5;
    },

    _play: function(song) {
        if (this.currentlyPlaying) {
            this.pause();
        }
        if (song) {
            var playing = {
                model: song,
                element : new Audio()
            };

            var self = this;
            $(playing.element)
                .on('canplay', function() {
                    this.play();
                })
                .on('error abort ended', function() {
                    self._next();
                })
                .on('canplay timeupdate waiting playing abort ended pause', function(evt) {
                    self.trigger(evt.type, self.getTrack());
                });

            playing.element.src = playing.model.get('src');
            playing.element.volume = this.volume;
            this.currentlyPlaying = playing;
        }
    },

    setSupplier: function(newSupplier) {
        if (!newSupplier || typeof newSupplier.next !== 'function' || typeof newSupplier.previous !== 'function') {
            throw "Invalid supplier.";
        }

        this.supplier = newSupplier;
    },

    start: function() {
        if (!this.supplier) {
            throw "Supplier must be set.";
        }

        this._next();
    },

    stop: function() {
        if (!this.supplier) {
            return;
        }

        this.pause();
        this.trigger('ended', this.getTrack());
        this.supplier = null;
        this.currentlyPlaying = null;
    },

    play: function() {
        if (!this.supplier) {
            throw "Supplier must be set.";
        }

        if (this.currentlyPlaying) {
            this.currentlyPlaying.element.play();
        }
    },

    pause: function() {
        if (!this.supplier) {
            throw "Supplier must be set.";
        }

        if (this.currentlyPlaying) {
            this.currentlyPlaying.element.pause();
        }
    },

    next: function() {
        if (!this.supplier) {
            throw "Supplier must be set.";
        }

        this.trigger('ended', this.getTrack());
        this._next();
    },

    _next: function() {
        if (!this.supplier) {
            throw "Supplier must be set.";
        }

        this._play(this.supplier.next());
    },

    previous: function() {
        if (!this.supplier) {
            throw "Supplier must be set.";
        }

        if (this.currentlyPlaying && this.currentlyPlaying.element.currentTime > 3) {
            this.currentlyPlaying.element.currentTime = 0;
            this.currentlyPlaying.element.play();
        } else {
            this._play(this.supplier.previous());
        }
    },

    getTrack: function() {
        return this.currentlyPlaying;
    },

    isPlaying: function() {
        return this.currentlyPlaying ? !this.currentlyPlaying.element.paused : false;
    },

    setVolume: function(newVolume) {
        if (!newVolume) {
            return;
        }

        this.volume = newVolume;

        if (this.currentlyPlaying) {
            this.currentlyPlaying.element.volume = this.volume;
        }
    }

});

//    /**
//     * Fire and forget
//     * Useful for notifications or sounds that need to be layered over other sounds
//     */
//    Music.prototype.playOver = function(url, volume) {
//        var audio = new Audio();
//        $(audio)
//            .on('canplaythrough', function() {
//                this.play();
//            });
//
//        audio.volume = volume === undefined ? 1 : volume;
//        audio.src = url;
//    };

//    /*
//     * Starts song at given time
//     * Untested... TODO
//     */
//    Music.prototype.seek = function(seconds) {
//        if (currentlyPlaying) {
//            currentlyPlaying.element.currentTime = Math.max(Math.min(seconds, currentlyPlaying.element.duration), 0);
//        }
//    };
