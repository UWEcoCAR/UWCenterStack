// creates the FileFinder service, which is a singleton
// that can recursively search folders for a given filetype
// modified from http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search

var fs = require('fs');
var finder = module.exports = {};

finder.find = function(directory, filetype, callback) {
    var results = [];
    fs.readdir(directory, function(err, list) {
        if (err) return callback(err);
        var pending = list.length;
        if (!pending) return callback(null, results);
        list.forEach(function(file) {
            if(process.env.MUSIC_PATH.indexOf('\\') != -1) {
                file = directory + '\\' + file;
            } else {
                file = directory + '/' + file;
            }
            fs.stat(file, function(err, stat) {

                if (stat && stat.isDirectory()) {
                    finder.find(file, filetype, function(err, res) {
                        results = results.concat(res);
                        if (!--pending) callback(null, results);
                    });
                } else if (file.substring(file.length - filetype.length, file.length) === filetype) {
                    results.push(file);
                    if (!--pending) callback(null, results);
                } else {
                    if (!--pending) callback(null, results);
                }
            });
        });
    });
};