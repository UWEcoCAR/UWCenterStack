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


secondSliderModel = new SliderModel({
    value : 0
});

var secondSliderView = new SliderView({
    model: secondSliderModel,
    equation: function(x) {return Math.pow(Math.cos( x * Math.PI * 2 + Math.PI ) / 2 + 0.5, 1.5);}
});

var secondListCollection = new ListItemCollection();
var secondListView = new WindowListView({
    data: secondListCollection,
    slider: secondSliderModel
});

secondListCollection.set([

    {text: "42"},
    {text: "A Hopeful Transmission"},
    {text: "A Message"},
    {text: "A Message 2010"},
    {text: "A Rush of Blood to the Head"},
    {text: "A Spell a Rebel Yell"},
    {text: "A Whisper"},
    {text: "Amsterdam"},
    {text: "Animals"},
    {text: "Atlas"},
    {text: "Before I lose"},
    {text: "Bigger Stronger"},
    {text: "Brothers & Sisters"},
    {text: "Careful Where You Stand"},
    {text: "Cemeteries of London"},
    {text: "Charlie Brown"},
    {text: "Chinese Sleep Chant"},
    {text: "Christmas Lights"},
    {text: "Clocks"},
    {text: "Crests of Waves"},
    {text: "Daylight"},
    {text: "Death and All His Friends"},
    {text: "Death Will Never Conquer"},
    {text: "Don't Let It Break Your Heart"},
    {text: "Don't Panic"},
    {text: "Easy to Please"},
    {text: "Every Teardrop Is a Waterfall"},
    {text: "Everything's Not Lost"},
    {text: "Fix You"},
    {text: "For You"},
    {text: "Glass of Water"},
    {text: "God Put a Smile upon Your Face"},
    {text: "Gold In Them Hills"},
    {text: "Gravity"},
    {text: "Green Eyes"},
    {text: "Help Is Round the Corner"},
    {text: "High Speed"},
    {text: "How You See the World"},
    {text: "How You See the World No. 2"},
    {text: "Hurts Like Heaven"},
    {text: "I Bloom Blaum"},
    {text: "I Ran Away"},
    {text: "In My Place"},
    {text: "Lhuna"},
    {text: "Life in Technicolor"},
    {text: "Life in Technicolor II"},
    {text: "Life Is for Living"},
    {text: "Lost!"},
    {text: "Lost+"},
    {text: "Lost?"},
    {text: "Lovers in Japan"},
    {text: "Low"},
    {text: "Major Minus"},
    {text: "M.M.I.X."},
    {text: "Mooie Ellebogen"},
    {text: "Moses"},
    {text: "Moving to Mars"},
    {text: "Murder"},
    {text: "Mylo Xyloto"},
    {text: "No More Keeping My Feet"},
    {text: "Ode to Deodorant"},
    {text: "One I Love"},
    {text: "Only Superstition"},
    {text: "Parachutes"},
    {text: "Paradise"},
    {text: "Prospekt's March"},
    {text: "Politik"},
    {text: "Poppyfields"},
    {text: "Postcards from Far Away"},
    {text: "Pour Me"},
    {text: "Princess of China"},
    {text: "Proof"},
    {text: "Rainy Day"},
    {text: "Reign of Love"},
    {text: "See You Soon"},
    {text: "Shiver"},
    {text: "Sleeping Sun"},
    {text: "Sparks"},
    {text: "Speed of Sound"},
    {text: "So Sad"},
    {text: "Spies"},
    {text: "Square One"},
    {text: "Strawberry Swing"},
    {text: "Such a Rush"},
    {text: "Swallowed in the Sea"},
    {text: "Talk"},
    {text: "The Escapist"},
    {text: "The Goldrush"},
    {text: "The Hardest Part"},
    {text: "The Scientist"},
    {text: "The World Turned Upside Down"},
    {text: "Things I Don't Understand"},
    {text: "Til Kingdom Come"},
    {text: "Trouble"},
    {text: "Twisted Logic"},
    {text: "U.F.O."},
    {text: "Us Against the World"},
    {text: "Up in Flames"},
    {text: "Up with the Birds"},
    {text: "Violet Hill"},
    {text: "Viva la Vida"},
    {text: "Warning Sign"},
    {text: "We Never Change"},
    {text: "What If"},
    {text: "White Shadows"},
    {text: "X&Y"},
    {text: "Yellow"},
    {text: "Yes"}
]);

//var sliderView2 = new SliderView({
//    model: sliderModel,
//    equation: function(x) {return Math.pow(Math.cos( x * Math.PI * 2 + Math.PI ) / 2 + 0.5, 1.5);}
//});

// create list
var listCollection = new ListItemCollection();
var listView = new WindowListView({
    data: listCollection,
    slider: sliderModel,
    nextData: secondListCollection
});


// add some items to the list
listCollection.set([
    {text: "Avenged Sevenfold"},
    {text: "Avicii"},
    {text: "The Black Eyed Peas"},
    {text: "Blackalicious"},
    {text: "Bon Jovi"},
    {text: "Boston"},
    {text: "Bryan Adams"},
    {text: "Cidinho & Doca"},
    {text: "The Clash"},
    {text: "Coldplay"},
    {text: "Daft Punk"},
    {text: "Dire Straits"},
    {text: "Disturbed"},
    {text: "Dobie Gray"},
    {text: "Dr. Dre"},
    {text: "Earth, Wind & Fire"},
    {text: "Elton John"},
    {text: "Eminem"},
    {text: "Europe"},
    {text: "Fat Joe"},
    {text: "Fat Joe featuring Lil' Wayne"},
    {text: "Finger Eleven"},
    {text: "Flobots"},
    {text: "The Fray"},
    {text: "Freestylers"},
    {text: "Game"},
    {text: "Gary Hoey"},
    {text: "George Thorogood & The Destroyers"},
    {text: "Gorillaz"},
    {text: "Gotye"},
    {text: "Grits"},
    {text: "The Hit Crew"},
    {text: "Incubus"},
    {text: "JAY Z"},
    {text: "Johnny Cash, June Carter & Merle Kilgore"},
    {text: "Journey"},
    {text: "Kenny Wayne Shepherd"},
    {text: "Lenny Kravitz"},
    {text: "Macklemore & Ryan Lewis"},
    {text: "Maino"},
    {text: "Marilyn Manson"},
    {text: "Nelly"},
    {text: "Noiseshaper"},
    {text: "Otis Taylor"},
    {text: "Parov Stellar"},
    {text: "Passenger"},
    {text: "Rage Against the Machine"},
    {text: "Red Hot Chili Peppers"},
    {text: "Rise Against"},
    {text: "RJD2"},
    {text: "Royal Crown Revue"},
    {text: "Seasons After"},
    {text: "Shinedown"},
    {text: "Sister Hazel"},
    {text: "Stephen Colbert"},
    {text: "Stone Sour"},
    {text: "Streetlight Manifesto"},
    {text: "Taylor Swift"}
]);

var listCollectionRight = new ListItemCollection();
var listViewRight = new TopDownListView({
    leftList: listCollection,
    data: listCollectionRight
});


listCollectionRight.set([
    {text: "Song"},
    {text: "Artist"}
]);

var homeModel = new AppModel({open: true, contentLeft: listView, hiddenContentLeft: secondListView, contentRight: listViewRight,  inputZone1: sliderView, inputZone4: secondSliderView});
var homeApp = new AppView({model: homeModel, id: '#home'});

$('#appContainer').append(homeApp.render().el);