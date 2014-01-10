function centerDashGraphic() {
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var graphicHeight = $('#dashGraphic').height();
    var graphicWidth = $('#dashGraphic').width();
    $('#dashGraphic')
        .css('top', windowHeight/2 - graphicHeight/2 + 130*(graphicHeight - windowHeight)/graphicHeight)
        .css('left', windowWidth/2 - graphicWidth/2 - 110*(graphicWidth-windowWidth)/graphicWidth);
}

$(window).resize(centerDashGraphic);

centerDashGraphic();

var curvySlider = createCurvySlider({
	equation: function(x) {
		return Math.cos( x * Math.PI * 2 + Math.PI ) / 2 + .5;
	}
});
var sliderList = new SliderList({
	cssSelector: '#slider-listing',
	sensitivity: .1
});

var sliderListTwo = new SliderList({
	cssSelector: '#slider-listing',
	sensitivity: .05,
	continuous: true
});

$('body').append(curvySlider.on('change', function(evt, data) {
	console.log("change", evt, data);
	sliderList.goToPosition(data.value);
}));

$('body').append(curvySlider.on('change', function(evt, data) {
	console.log("change", evt, data);
	sliderListTwo.goToPosition(data.value);
}));
