var ScreenLayout = Backbone.Marionette.Layout.extend({
    vent: _.extend({}, Backbone.Events),
    template: '#screenTemplate',
    regions: {
        backgroundIconContent: '#backgroundIconContent',
        backButtonZoneContent: '#backButtonZoneContent',
        homeButtonZoneContent: '#homeButtonZoneContent',
        mainZoneContent: '#mainZoneContent',
        leapContent: '#leapContent',
        inputZone1Content: '#inputZone1Content',
        inputZone2Content: '#inputZone2Content',
        inputZone3Content: '#inputZone3Content',
        inputZone4Content: '#inputZone4Content',
        inputZone5Content: '#inputZone5Content',
        volumeSliderZoneContent: '#volumeSliderZoneContent',
        playPauseButtonZoneContent: '#playPauseButtonZoneContent',
        nextButtonZoneContent: '#nextButtonZoneContent'
    }
});