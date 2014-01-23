$(window).load(function() {

	// create slider
	sliderModel = new SliderModel({
		value : .5
	});

	var sliderView = new SnapSliderView({
		model      : sliderModel,
		top        : 10,
		left       : 10,
		width      : 600,
		height     : 100,
		equation   : function(x) {return (Math.cos( x * Math.PI * 2 + Math.PI ) / 2 + .5)},
		diameter   : 20
	});

	// create list
	var listCollection = new ListItemCollection();

	var listView = new DragListView({
		data   : listCollection,
		slider : sliderModel,
		top    : 100,
		left   : 200,
		width  : 300,
		height : 200
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