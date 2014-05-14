var fs = require('fs');
var path = require('path');

var FileWatcher = Marionette.Controller.extend({
    initialize: function(options) {

        // Parse filepath
        this.filepath = options.filepath;
        this.parentpath = path.dirname(this.filepath);
        this.filename = path.basename(this.filepath);

        // Fire a connected event if initially connected
        if (fs.existsSync(this.filepath)) {
            _.defer(_.bind(function() {
                this.trigger('connected', this.filepath);
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
                // Delay before notifying others because the file system still probably isn't ready.
                setTimeout(_.bind(function() {
                    this.trigger('connected', this.filepath);
                }, this), 3000);
            } else {
                this.trigger('disconnected', this.filepath);
            }

        }, this));
    },

    fileExists: function() {
        return fs.existsSync(this.filepath);
    }
});
