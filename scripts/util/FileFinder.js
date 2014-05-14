// creates the FileFinder service, which is a singleton
// that can recursively search folders for a given filetype
// modified from http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search

var fs = require('fs');
var path = require('path');
var finder = module.exports = {};

finder.find = function(directory, filetype, callback) {
    var results = [];
    fs.readdir(directory, function(err, list) {
        if (err) return callback(err);

        if (list.length === 0) return callback(null, results);

        var doneFn = _.after(list.length, function() {
            callback(null, results);
        });
        list.forEach(function(file) {
            var filepath = path.join(directory, file);
            fs.stat(filepath, function(err, stat) {
                if (err) return callback(err);

                if (stat && stat.isDirectory()) {
                    finder.find(filepath, filetype, function(err, res) {
                        if (res && res.length > 0) {
                            results = results.concat(res);
                        }
                        doneFn();
                    });
                } else if (path.extname(file) === '.' + filetype && !(/(^|.\/)\.+[^\/\.]/g).test(filepath)) {
                    results.push(filepath);
                    doneFn();
                } else {
                    doneFn();
                }
            });
        });
    });
};