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
                .on('canplay timeupdate waiting playing abort ended pause', function(evt) {
                    self.trigger(evt.type, self.getTrack());
                })
                .on('error abort ended', function() {
                    self._next();
                });

            playing.element.src = playing.model.get('src');
            playing.element.volume = this.volume;
            this.currentlyPlaying = playing;
        } else {
            this.currentlyPlaying = undefined;
        }
    },

    setSupplier: function(newSupplier) {
        if (!newSupplier || typeof newSupplier.next !== 'function' || typeof newSupplier.previous !== 'function') {
            throw "Invalid supplier.";
        }

        this.supplier = newSupplier;
        return this;
    },

    start: function() {
        if (!this.supplier) {
            throw "Supplier must be set.";
        }

        this._play(this.supplier.next());
        console.log('MUSIC:START ' + this.getTrack().model.get('src'));
        this.trigger('start', this.getTrack());
        return this;
    },

    stop: function() {
        if (!this.supplier) {
            return;
        }

        this.pause();
        this.supplier = undefined;
        this.currentlyPlaying = undefined;
        this.trigger('ended', this.getTrack());
        console.log('MUSIC:STOP');
        this.trigger('stop');
        return this;
    },

    play: function() {
        if (!this.supplier) {
            throw "Supplier must be set.";
        }

        if (this.currentlyPlaying) {
            this.currentlyPlaying.element.play();
        }
        return this;
    },

    pause: function() {
        if (!this.supplier) {
            throw "Supplier must be set.";
        }

        if (this.currentlyPlaying) {
            this.currentlyPlaying.element.pause();
        }
        return this;
    },

    next: function() {
        if (!this.supplier) {
            throw "Supplier must be set.";
        }

        var lastTrack = this.getTrack();
        this._next();
        this.trigger('ended', lastTrack);
        return this;
    },

    _next: function() {
        if (!this.supplier) {
            throw "Supplier must be set.";
        }

        if (this.supplier.hasNext()) {
            this._play(this.supplier.next());
            console.log('MUSIC:NEXT ' + this.getTrack().model.get('src'));
            this.trigger('next', this.getTrack());
        } else {
            this._play();
            console.log('MUSIC:STOP');
            this.trigger('stop');
        }
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
            console.log('MUSIC:PREVIOUS ' + this.getTrack().model.get('src'));
            this.trigger('previous', this.getTrack());
        }
        return this;
    },

    getTrack: function() {
        return this.currentlyPlaying;
    },

    isPlaying: function() {
        return this.currentlyPlaying ? true : false;
    },

    canPlay: function() {
        return (!this.currentlyPlaying && this.supplier && this.supplier.hasNext()) || (this.currentlyPlaying && this.currentlyPlaying.element.paused);
    },

    canPause: function() {
        return this.currentlyPlaying !== undefined && !this.currentlyPlaying.element.paused;
    },

    setVolume: function(newVolume) {
        this.volume = _.saturate(newVolume, 0, 1);

        if (this.currentlyPlaying) {
            this.currentlyPlaying.element.volume = this.volume;
        }
        return this;
    },

    getVolume: function() {
        return this.volume;
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
