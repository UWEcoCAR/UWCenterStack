$(window).load(function() {

	// create slider
	sliderModel = new SliderModel({
		value : .5
	});
	var sliderView = new SliderView({
		model: sliderModel,
		top: -45,
		left: 0,
		width: 319,
		height: 62,
		equation: function(x) {return (Math.cos( x * Math.PI * 2 + Math.PI ) / 2 + .5)},
		diameter : 20,
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

	// render and append elements
	// TODO may have to render after appending so elements
	// (eg listScroller) can know their height

    $('#screenContent .left').append(listView.el);
    $('#sliders .slider').eq(0).append(sliderView.el);

    sliderView.render();
    listView.render();

});