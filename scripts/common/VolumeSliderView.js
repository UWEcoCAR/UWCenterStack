var VolumeSliderView = SliderView.extend({
    initialize: function(options) {
        SliderView.prototype.initialize.apply(this, [_.extend({
            iconLeft: '#volumeDownIcon',
            iconRight: '#volumeUpIcon',
            eventCatcher: '#volumeZoneEventCatcher'
        }, options)]);

    }
});