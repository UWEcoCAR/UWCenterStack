var TrackModel = Backbone.Model.extend({

    getAlbumArtImage: _.bind(function() {
        // http://stackoverflow.com/questions/9429234/convert-base64-string-to-image-with-javascript
        return $('<img src="data:' + this.get('imageMime') + ';base64,' + this._arrayBufferToBase64(this.get('imageData')) + '" />');
    }, this),

    _arrayBufferToBase64: function(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[ i ]);
        }
        return window.btoa(binary);
    }
});