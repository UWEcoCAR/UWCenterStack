var choices;
var width;
var height;
var navigation;
var contain;
//var canvas;

window.onload = function onLoad() {	
	width = window.innerWidth;
	height = window.innerHeight;
	
	document.addEventListener("touchstart", onTouchStart, false);
	document.addEventListener("touchmove", onTouchMove, false);
	document.addEventListener("touchend", onTouchEnd, false);

	document.addEventListener("mousedown", onMouseDown, false);
	
	choices = new Array("Artists", "Albums", "Songs", "Playlists");

	navigation = new Array("All Artists / Maroon 5",
							"All Artists / Maroon 5 / Overexposed",
							"All Artists / Maroon 5 / Overexposed / Daylight",
							"Playlist");

	for (var i = 0; i < choices.length; i++) {
		var x = 150;
		if (i == 0 || i == choices.length - 1) {
			x = 200;
		}
		createDiv(x, 180 + 80 * i, choices[i], 100, 50);
	};	
}

function createDiv(x, y, value, width, height) {
	var newDiv = document.createElement("div");
	newDiv.style.position = "absolute";
	newDiv.style.left = x + 'px';
	newDiv.style.top = y + 'px';
	newDiv.className = 'buttons';
	newDiv.innerHTML = value;
    $('#container').append(newDiv)
}

// buttons do not work with touch events
// unless we used sencha touch or some other library
function createButton(x, y, value, width, height) {
	var button = document.createElement("input");
	button.setAttribute("type", "button");
	button.setAttribute("value", value);
	button.style.position = "absolute";
	button.style.left = x + 'px';
	button.style.top = y + 'px';
	button.setAttribute("onTouch", "buttonClick(this.value)");
    $('#container').append(button);
}

function buttonClick(clickedButton) {
	$("#nav").html(clickedButton);
}

function onMouseDown(e) {
	onMove(e.pageX, e.pageY);
}

function onTouchMove(e) {
	e.preventDefault();
	var x = e.targetTouches[0].pageX;
	var y = e.targetTouches[0].pageY;
	onMove(x, y);
}


function onTouchStart(e) {
	e.preventDefault();
}

function onTouchEnd(e) {
	e.preventDefault();
}

function onMove(x, y) {
	var buttons = $(".buttons");
	for (var i = 0; i < buttons.length; i++) {
		// determine if it touches any of the buttons
		var buttonWidth = $(buttons[i]).width();
		var buttonHeight = $(buttons[i]).height();
		var buttonX = parseInt(buttons[i].style.left);
		var buttonY = parseInt(buttons[i].style.top);
		// determine which button was pressed
		if (x - buttonX <= buttonHeight && x - buttonX >= 0 &&
			y - buttonY <= buttonWidth && y - buttonY >= 0) {
			$("#nav").html(choices[i]);
		}
	}
}
