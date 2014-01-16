$(window).load(function() {
	var sliderModel = new SliderModel();
	var sliderView = new SliderView({
		model: sliderModel,
		top: 0,
		left: 0,
		width: 300,
		height: 20,
		equation: function(x) {return .5},
		diameter : 20
	});

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

	$('body').append(listView.el);

});