global.$ = global.jQuery = $;
global._ = _;
global.Backbone = Backbone;

// create slider
sliderModel = new SliderModel({
    value : 0.5
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

var homeModel = new AppModel({open: true, content: listView});
var homeApp = new AppView({model: homeModel, id: '#home'});

$('#appContainer').append(homeApp.render().el);