/**
 * JavaScript Entry Point
 *
 * Initializes the Home, Eve, Music, and Climate Control apps. Also initializes global modules like the audio controller.
 *
 *
 *
 * node-webkit context: window
 */

var CenterStack = Backbone.Marionette.Application.extend({
    index: function() {
        var homeScreen = new HomeScreen();
        centerStack.main.show(homeScreen);
        homeScreen.mainZoneContent.show(new ClockView());
        homeScreen.backButtonZoneContent.show(new ButtonView({icon: "#backIcon", eventCatcher: "#backButtonZoneEventCatcher"}));
        homeScreen.homeButtonZoneContent.show(new ButtonView({icon: "#homeIcon", eventCatcher: "#backButtonZoneEventCatcher"}));
        homeScreen.volumeSliderZoneContent.show(new SliderView({iconLeft: "#volumeUpIcon", iconRight: "#volumeDownIcon", leftLabel: "", rightLabel: "", eventCatcher: "#playPauseButtonZoneEventCatcher"}));
    },

    climateHome: function() {
        var climateHomeScreen = new ClimateHomeScreen();
        centerStack.main.show(climateHomeScreen);
        climateHomeScreen.backButtonZoneContent.show(new ButtonView({icon: "#backIcon", eventCatcher: "#backButtonZoneEventCatcher"}));
        climateHomeScreen.homeButtonZoneContent.show(new ButtonView({icon: "#homeIcon", eventCatcher: "#backButtonZoneEventCatcher"}));
        climateHomeScreen.inputZone1Content.show(new SliderView({iconLeft: "", iconRight: "", leftLabel: "DRIVER", rightLabel: "PASSENGER", eventCatcher: "#inputZone1EventCatcher"}));
        climateHomeScreen.inputZone2Content.show(new SliderView({iconLeft: "", iconRight: "", leftLabel: "TEMP", rightLabel: "", eventCatcher: "#inputZone2EventCatcher"}));
        climateHomeScreen.inputZone3Content.show(new SliderView({iconLeft: "", iconRight: "", leftLabel: "FAN", rightLabel: "", eventCatcher: "#inputZone3EventCatcher"}));

    }

    // Route handlers go here
});
centerStack = new CenterStack();

centerStack.addInitializer(function() {
    new Backbone.Marionette.AppRouter({
        controller: centerStack,
        appRoutes: {
            '' : 'index',
            'climate' : 'climateHome'
            // Routes go here
        }
    });

    Backbone.history.start();

    console.log('Application Starting');
});

centerStack.addRegions({
    main: '#appContainer'
});

centerStack.start();
