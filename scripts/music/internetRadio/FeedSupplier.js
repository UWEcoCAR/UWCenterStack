window.FeedSupplier = function(callback) {
    this.stations = new Backbone.Collection([]);
    this.currentStation;
    this._init(callback);
};

/**
 * Initialize the object by getting authentication,
 * tuning into recomended radio, and getting tracks
 */
FeedSupplier.prototype._init = function(callback) {
    var self = this;
    $.ajax({
        url: 'https://feed.fm/api/v2/placement',
        method: 'GET',
        headers: {
            'Authorization': this._getAuthenticationString()
        },
        success: function(data) {
            _.each(data.stations, function(station) {
                self.stations.push(new InternetRadioModel(station));
            });
            callback && callback();
        },
        error : function(xhr, error) {
            callback && callback(error);
        }
    });

    Controllers.Music
        .on('playing', function(track) {
            console.log('playing ' + track.model.get('id'));
            if (!track || !track.model.get('id')) {
                return;
            }
            $.ajax({
                url: 'https://feed.fm/api/v2/play/' + track.model.get('id') + '/start',
                method: 'POST',
                headers: {
                    'Authorization': this._getAuthenticationString()
                }
            });
        }, this)
        .on('ended', function(track) {
            console.log('ended ' + track.model.get('id'));
            if (!track || !track.model.get('id')) {
                return;
            }
            $.ajax({
                url: 'https://feed.fm/api/v2/play/' + track.model.get('id') + '/complete',
                method: 'POST',
                headers: {
                    'Authorization': this._getAuthenticationString()
                }
            });
        }, this);
};

FeedSupplier.prototype.getStations = function() {
    return this.stations;
};

FeedSupplier.prototype.setStation = function(stationModel) {
    this.currentStation = stationModel;
};

/**
 * Creates an api_sig based off your parameters as specified
 * in section 4 of http://www.last.fm/api/mobileauth
 */
FeedSupplier.prototype._makeRequest = function(params) {
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
 * Going back is not allowed for radio
 */
FeedSupplier.prototype.previous = function() {
    return null;
};

/**
 * Get the next element, refill the queue if needed
 */
FeedSupplier.prototype.next = function() {
    var trackModel;
    if (!this.currentStation) {
        this.currentStation = this.stations.at(0);
    }
    $.ajax({
        url: 'https://feed.fm/api/v2/play',
        method: 'POST',
        async: false,
        data: {
            station_id: this.currentStation.get('id'),
            client_id: CONFIG.FEED_CLIENT
        },
        headers: {
            'Authorization': this._getAuthenticationString()
        },
        success: function(data) {
            console.log(data);
            trackModel = new TrackModel({
                id: data.play.id,
                name: data.play.audio_file.track.title,
                albumName: data.play.audio_file.release.title,
                artistName: data.play.audio_file.artist.name,
                src: data.play.audio_file.url
            });
        },
        error : function(xhr, error) {
            trackModel = error;
        }
    });
    return trackModel;
};

/**
 *  this radio never ends, i think
 */
FeedSupplier.prototype.hasNext = function() {
    return true;
};

FeedSupplier.prototype._getAuthenticationString = function() {
    return 'Basic ' + btoa(CONFIG.FEED_TOKEN + ':' + CONFIG.FEED_SECRET);
};

FeedSupplier.prototype.cleanUp = function() {
    Controllers.Music.off(null, null, this);
};