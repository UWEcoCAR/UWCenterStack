/**
 * JavaScript Entry Point
 *
 * Initializes the Home, Eve, Music, and Climate Control apps. Also initializes global modules like the audio controller.
 *
 *
 *
 * node-webkit context: window
 */

var path = require('path');

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
        var musicUSBHomeScreen = new MusicUSBHomeScreen({ model: this.musicUSBModel });
        centerStack.main.show(musicUSBHomeScreen);
    },

    filteredTrackSelect: function() {
        var filteredTrackSelectScreen = new FilteredTrackSelectScreen({ model: this.musicUSBModel });
        centerStack.main.show(filteredTrackSelectScreen);
    },

    filteredAlbumTrackSelect: function() {
        var filteredAlbumTrackSelectScreen = new FilteredAlbumTrackSelectScreen({ model: this.musicUSBModel });
        centerStack.main.show(filteredAlbumTrackSelectScreen);
    }

    // Route handlers go here
});
centerStack = new CenterStack();

// Initialize routing and history
centerStack.addInitializer(function() {

    centerStack.climateModel = new ClimateControlModel();
    centerStack.musicModel = new MusicModel();
    centerStack.musicUSBModel = new MusicUSBModel();

    new Backbone.Marionette.AppRouter({
        controller: centerStack,
        appRoutes: {
            '' : 'index',
            'climate' : 'climateHome',
            'music' : 'musicHome',
            'music/musicUSB' : 'musicUSBHome',
            'music/musicUSB/filteredTrackSelect' : 'filteredTrackSelect',
            'music/musicUSB/filteredAlbumTrackSelect' : 'filteredAlbumTrackSelect'
            // Routes go here
        }
    });

    Backbone.history.start();

});

// Load media
centerStack.addInitializer(function() {
    var fileWatcher = new FileWatcher({filepath: process.env.MEDIA_PATH});
    this.listenTo(fileWatcher, 'connected', function(filepath) {
        console.log('CONNECTED: ' + filepath);
        Controllers.MusicTree.load(filepath);

        new JsonFileReader({
            filepath: path.join(filepath, 'user.json'),
            callback: function(user) {
                Controllers.User.setUser(user);
            }
        });
    });
    this.listenTo(fileWatcher, 'disconnected', function(filepath) {
        console.log('DISCONNECTED: ' + filepath);
        Controllers.MusicTree.empty();
        Controllers.Music.stop();
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

window.Controllers = {
    User: new UserController(),
    Music: new MusicController(),
    MusicTree: new (require('../scripts/music/MusicTreeController'))()
};

console.log('Application Starting');
centerStack.start();

