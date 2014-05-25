var ConnectionChecker = Marionette.Controller.extend({

    initialize: function() {
        this.connected = false;

        this.checkConnection();
        setInterval(_.bind(this.checkConnection, this), 1000);
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
    }

});