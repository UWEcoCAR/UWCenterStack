var fs = require('fs');

var JsonFileReader = Marionette.Controller.extend({
    initialize: function(options) {
        var filepath = options.filepath;
        var callback = options.callback;
        var self = this;

        if (!fs.existsSync(filepath)) {
            throw 'JSON file does not exist: ' + filepath;
        }

        fs.readFile(filepath, 'utf8', function (err, data) {
            if (err) {
                console.log('Error: ' + err);
                callback && callback(err);
            }
            var object = JSON.parse(data);
            callback && callback(object);
            self.trigger('parsed', object);
        });
    }
});
