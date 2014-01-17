$(window).load(function() {

	// create slider
	var sliderModel = new SliderModel({
		value : .5
	});
	var sliderView = new SliderView({
		model: sliderModel,
		top: 10,
		left: 10,
		width: 600,
		height: 100,
		equation: function(x) {return .5},
		diameter : 20,
	});

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
		{text: 'Eighth'}
	]);

	// render and append elements
	$('body').append(
		sliderView.render().el,
		listView.render().el
	);

});