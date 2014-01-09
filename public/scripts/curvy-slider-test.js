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

var curvySlider1 = createCurvySlider({
    width: 303,
    left: 921,
    top: 713 - 64,
    diameter : 30,
	equation: function(x) {
		return (Math.cos( x * Math.PI * 2 + Math.PI ) / 2 + .5) * .6 + .08;
	}
});
var curvySlider2 = createCurvySlider({
    width: 303,
    left: 921,
    top: 713 - 32,
    diameter : 30,
    equation: function(x) {
        return (Math.cos( x * Math.PI * 2 + Math.PI ) / 2 + .5) * .6 + .08;
    }
});
var curvySlider3 = createCurvySlider({
    width: 303,
    left: 921,
    top: 713,
    diameter : 30,
    equation: function(x) {
        return (Math.cos( x * Math.PI * 2 + Math.PI ) / 2 + .5) * .6 + .08;
    }
});
var curvySlider4 = createCurvySlider({
    width: 303,
    left: 921,
    top: 713 + 32,
    diameter : 30,
    equation: function(x) {
        return (Math.cos( x * Math.PI * 2 + Math.PI ) / 2 + .5) * .6 + .08;
    }
});
var curvySlider5 = createCurvySlider({
    width: 303,
    left: 921,
    top: 713 + 64,
    diameter : 30,
    equation: function(x) {
        return (Math.cos( x * Math.PI * 2 + Math.PI ) / 2 + .5) * .6 + .08;
    }
});
var sliderList = new SliderList('#slider-list');
$('#dashGraphic').append(curvySlider5.on('change', function(evt, data) {
	console.log("change", evt, data);
	sliderList.goToPosition(data.value);
}),
curvySlider4, curvySlider3, curvySlider2, curvySlider1);
