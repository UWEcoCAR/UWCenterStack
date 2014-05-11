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
        var musicUSBHomeScreen = new MusicUSBHomeScreen();
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

// Load music
centerStack.addInitializer(function() {
    var fileWatcher = new FileWatcher(process.env.MUSIC_PATH);
    fileWatcher.getVent().on('connected', function(filepath) {
        MusicTree.load(filepath);
    });
});

// Load LEAP
centerStack.addInitializer(function() {
    if (process.env.LEAP == 'true') {
        var opacity = 1;
        Leap.loop(function(frame) {
            if (frame.hands.length < 1 && opacity !== 0.5) {
                opacity = 0.5;
                $('body').css('opacity', opacity);
            } else if (frame.hands.length >= 1 && opacity !== 1) {
                opacity = 1;
                $('body').css('opacity', opacity);
            }
        });
    }
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

window.MusicTree = new (require('../scripts/music/MusicTree.js'))();

console.log('Application Starting');
centerStack.start();

