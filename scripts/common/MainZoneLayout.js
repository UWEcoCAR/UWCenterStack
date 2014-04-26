var MainZoneLayout = Backbone.Marionette.Layout.extend({
    template: '#mainZoneTemplate',
    regions: {
        clock: '.clock',
        currentTrack: '.currentTrack',
        contentLeft: '.contentLeft',
        contentRight: '.contentRight'
    }
});