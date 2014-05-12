(function() {
    var fs = require('fs');

    window.JsonFileReader = function(filepath) {
        var self = this;
        this.vent = _.extend({}, Backbone.Events);
        this.filepath = filepath;

        if (!fs.existsSync(this.filepath)) {
            throw 'JSON file does not exist: ' + this.filepath;
        }
        fs.readFile(filepath, 'utf8', function (err, data) {
            if (err) {
                console.log('Error: ' + err);
                return;
            }

            self.vent.trigger('parsed', JSON.parse(data));
        });
    };

    JsonFileReader.prototype.getVent = function() {
        return this.vent;
    };
})();