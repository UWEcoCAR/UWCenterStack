/**
 * Model and View for home screen
 */

var ScreenLayout = Backbone.Marionette.Layout.extend({
    template: '#screenTemplate',
    regions: {
        backButtonZoneContent: '#backButtonZoneContent',
        homeButtonZoneContent: '#homeButtonZoneContent',
        mainZoneContent: '#mainZoneContent',
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

var HomeScreen = ScreenLayout.extend({
    onRender: function() {
        this.mainZoneContent.show(new ClockView());
        var vent = _.extend({}, Backbone.Events);
        var backButtonView = new ButtonView({icon: "#backIcon", eventCatcher: "#backButtonZoneEventCatcher", vent: vent});
        var homeButtonView = new ButtonView({icon: "#homeIcon", eventCatcher: "#homeButtonZoneEventCatcher", vent: vent});
        var volumeSlider = new SliderView({iconLeft: "#volumeUpIcon", iconRight: "#volumeDownIcon", leftLabel: "", rightLight: "", eventCatcher: "#volumeSliderZoneEventCatcher", vent: vent});
        vent.on('buttonClick', function(data) {
            console.log(data.clientX);
        });
    }
});


/* create slider
sliderModel = new SliderModel({
    value : 0.5
});

var sliderView = new SliderView({
    model: sliderModel,
    top: -45,
    left: 0,
    width: 319,
    height: 62,
    equation: function(x) {return (Math.cos( x * Math.PI * 2 + Math.PI ) / 2 + 0.5);},
    diameter : 20
});

// create list
var listCollection = new ListItemCollection();
var listView = new ListView({
    data: listCollection,
    slider: sliderModel,
    top: 0,
    left: 0,
    width: 300,
    height: 200
});

// add some items to the list
listCollection.set([
    {text: 'First'},
    {text: 'Second'},
    {text: 'Third'},
    {text: 'Fourth'},
    {text: 'Fifth'},
    {text: 'Sixth'},
    {text: 'Seventh'},
    {text: 'Eighth'},
    {text: 'First'},
    {text: 'Second'},
    {text: 'Third'},
    {text: 'Fourth'},
    {text: 'Fifth'},
    {text: 'Sixth'},
    {text: 'Seventh'},
    {text: 'Eighth'},
    {text: 'First'},
    {text: 'Second'},
    {text: 'Third'},
    {text: 'Fourth'},
    {text: 'Fifth'},
    {text: 'Sixth'},
    {text: 'Seventh'},
    {text: 'Eighth'}
]);

var appModel = new AppModel();
var appView = new AppView({
    model : appModel,
    sliders : [
        sliderView
    ],
    view : listView
});

// render and append elements
// (eg listScroller) can know their height
$('#dashGraphic').append(
    appView.el
);

appView.render();
sliderView.render();
listView.render();*/