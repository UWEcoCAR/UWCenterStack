$(window).load(function() {
	var sliderModel = new SliderModel();
	var sliderView = new SliderView({
		model: sliderModel,
		top: 10,
		left: 10,
		width: 600,
		height: 100,
		equation: function(x) {return .5},
		diameter : 20,
		defaultValue : .5
	});

	a = sliderView;

	var listCollection = new ListItemCollection();
	var listView = new ListView({data: listCollection, slider: sliderModel});

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

	$('body').append(
		sliderView.render().el,
		listView.render().el
	);

});