/**
 * JavaScript Entry Point
 *
 * Initializes the Home, Eve, Music, and Climate Control apps. Also initializes global modules like the audio controller.
 *
 *
 *
 * node-webkit context: window
 */
global.$ = global.jQuery = $;
global._ = _;
global.Backbone = Backbone;

// create slider
sliderModel = new SliderModel({
    value : 0
});

var sliderView = new SliderView({
    model: sliderModel,
    equation: function(x) {return Math.pow(Math.cos( x * Math.PI * 2 + Math.PI ) / 2 + 0.5, 1.5);}
});

//var sliderView2 = new SliderView({
//    model: sliderModel,
//    equation: function(x) {return Math.pow(Math.cos( x * Math.PI * 2 + Math.PI ) / 2 + 0.5, 1.5);}
//});

// create list
var listCollection = new ListItemCollection();
var listView = new ListView({
    data: listCollection,
    slider: sliderModel
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

var homeModel = new AppModel({open: true, content: listView, inputZone1: sliderView});
var homeApp = new AppView({model: homeModel, id: '#home'});

$('#appContainer').append(homeApp.render().el);