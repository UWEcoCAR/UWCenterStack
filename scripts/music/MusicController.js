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
        } else {
            this.currentlyPlaying = undefined;
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

        this._play(this.supplier.next());
        console.log('MUSIC:START ' + this.getTrack().model.get('src'));
        this.trigger('start', this.getTrack());
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

        this._next();
        this.trigger('ended', this.getTrack());
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
