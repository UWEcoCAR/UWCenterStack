/**
 * JavaScript Entry Point
 *
 * Initializes the Home, Eve, Music, and Climate Control apps. Also initializes global modules like the audio controller.
 *
 *
 *
 * node-webkit context: window
 */

// Initialize keystrokes

var CenterStack = Backbone.Marionette.Application.extend({

    index: function() {
        var homeScreen = new HomeScreen();
        centerStack.main.show(homeScreen);
    },

    climateHome: function() {
        var climateHomeScreen = new ClimateHomeScreen({ model: this.climateModel });
        centerStack.main.show(climateHomeScreen);
    },

    musicHome: function() {
        var musicHomeScreen = new MusicHomeScreen({ model: this.musicModel });
        centerStack.main.show(musicHomeScreen);
    },

    musicUSBHome: function() {
        var musicUSBHomeScreen = new MusicUSBHomeScreen({ model: this.musicModel });
        centerStack.main.show(musicUSBHomeScreen);
    }
    // Route handlers go here
});
centerStack = new CenterStack();

// Initialize routing and history
centerStack.addInitializer(function() {

    centerStack.climateModel = new ClimateControlModel();
    centerStack.musicModel = new MusicModel();
    new Backbone.Marionette.AppRouter({
        controller: centerStack,
        appRoutes: {
            '' : 'index',
            'climate' : 'climateHome',
            'music' : 'musicHome',
            'music/musicUSB' : 'musicUSBHome'
            // Routes go here
        }
    });

    Backbone.history.start();

});

// Load SVG's
var fs = require('fs');
_.each(['bezelOverlay', 'eventCatchers', 'icons'], function(file) {
    $('#svgContainer').append(fs.readFileSync('svg/' + file + '.svg', 'utf8'));
});
$('#bezelOverlayWrapper').copyIn('#bezelOverlay');
$('#eventCatchersWrapper').copyIn('#eventCatchers');

centerStack.addRegions({
    main: '#appContainer'
});

if (process.env.LEAP == 'true') {
    var Leap = require('leapjs');
    Leap.loop(function(frame) {
        var opacity = 1;
        if (frame.hands.length < 1) {
            opacity = 0.5;
        }
        $('body').css('opacity', opacity);
    });
}

console.log('Application Starting');
centerStack.start();

window.MusicTree = require('../scripts/music/MusicTree');
window.musicTree = new MusicTree('/Users/mitchellloeppky/Downloads/songs', function() {});
