var ConnectionChecker = Marionette.Controller.extend({

    initialize: function() {
        this.connected = false;

        this.checkConnection();
    },

    start: function(testUrl, interval) {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(_.bind(function() {
            this.checkConnection(testUrl);
        }, this), interval || 1000);
    },

    checkConnection: function(testUrl) {
        require('dns').resolve(testUrl || 'www.google.com', _.bind(function(err) {
            if (err && this.connected) {
                this.connected = false;
                this.trigger('disconnected');
            } else if (!err && !this.connected) {
                this.connected = true;
                this.trigger('connected');
            }
        }, this));
    },

    stop: function() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

});