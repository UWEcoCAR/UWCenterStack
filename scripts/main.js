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
    },

    internetRadio: function() {
        var internetRadioHomeScreen = new InternetRadioHomeScreen({ model: this.internetRadioModel });
        centerStack.main.show(internetRadioHomeScreen);
    },

    eveHome: function() {
        var eveHomeScreen = new EveHomeScreen({model: this.eveModel});
        centerStack.main.show(eveHomeScreen);
    },

    vehicleMonitor: function() {
        var vehicleMonitorHomeScreen = new VehicleMonitorHomeScreen();
        centerStack.main.show(vehicleMonitorHomeScreen);
    }

    // Route handlers go here
});
centerStack = new CenterStack();

// Initialize routing and history
centerStack.addInitializer(function() {

    centerStack.climateModel = new ClimateControlModel();
    centerStack.musicModel = new MusicModel();
    centerStack.musicUSBModel = new MusicUSBModel();
    centerStack.internetRadioModel = new InternetRadioModel();
    centerStack.eveModel = new EveModel();

    new Backbone.Marionette.AppRouter({
        controller: centerStack,
        appRoutes: {
            '' : 'index',
            'climate' : 'climateHome',
            'music' : 'musicHome',
            'music/musicUSB' : 'musicUSBHome',
            'music/musicUSB/filteredTrackSelect' : 'filteredTrackSelect',
            'music/musicUSB/filteredAlbumTrackSelect' : 'filteredAlbumTrackSelect',
            'music/internetRadio' : 'internetRadio',
            'eve' : 'eveHome',
            'vehicleMonitor' : 'vehicleMonitor'
            // Routes go here
        }
    });

    Backbone.history.start();

});

// Load media
centerStack.addInitializer(function() {
    var fileWatcher = new FileWatcher({filepath: CONFIG.MEDIA_PATH});
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

var CanReadWriter = require('uwcenterstack-canreadwriter');
window.Controllers = {
    User: new UserController(),
    Music: new MusicController(),
    MusicTree: new (require('../scripts/music/usb/MusicTreeController'))(),
    Leap: new LeapController(),
    CanReadWriter: CONFIG.FAKE_CAN ? new CanReadWriter.TestCanEmitter() : new CanReadWriter(),
    Haptic: CONFIG.FAKE_HAPTIC ? new FakeHapticController() : new (require('uwcenterstack-hapticcontroller'))('/dev/ttyACM0')
};

centerStack.on('start', function() {
    Controllers.Gradient = new GradientController();
    Controllers.Haptic.setUp();
    

});

console.log('Application Starting');
centerStack.start();

