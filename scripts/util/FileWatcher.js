(function() {
    var fs = require('fs');

    window.FileWatcher = function(filepath) {
        this.vent = _.extend({}, Backbone.Events);

        // Parse filepath
        this.filepath = filepath;
        this.parentpath = filepath.substr(0, filepath.lastIndexOf('/'));
        this.filename = filepath.substr(filepath.lastIndexOf('/') + 1);

        // Fire a connected event if initially connected
        if (fs.existsSync(this.filepath)) {
            _.defer(_.bind(function() {
                this.vent.trigger('connected', this.filepath);
            }, this));
        }

        // Watch for changes to the filepath
        fs.watch(this.parentpath, _.bind(function(event, filename) {

            // We only want changes to filepath, not other files in the directory
            if (filename !== this.filename) {
                return;
            }

            // Determine if it was a connect, or disconnect
            if (fs.existsSync(this.filepath)) {
                this.vent.trigger('connected', this.filepath);
            } else {
                this.vent.trigger('disconnected', this.filepath);
            }

        }, this));
    };

    FileWatcher.prototype.fileExists = function() {
        return fs.existsSync(this.filepath);
    };

    FileWatcher.prototype.getVent = function() {
        return this.vent;
    };
})();
