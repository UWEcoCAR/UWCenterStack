var choices;
var width;
var height;
var navigation;
var contain;
var selectionPath;
var currentChoice;
var wheelChoices;
var topOfWheel;


window.onload = function onLoad() {	
	width = window.innerWidth;
	height = window.innerHeight;
	
	document.addEventListener("touchstart", onTouchStart, false);
	document.addEventListener("touchmove", onTouchMove, false);
	document.addEventListener("touchend", onTouchEnd, false);

	document.addEventListener("mousedown", onMouseDown, false);
	
	choices = new Array("Artists", "Albums", "Songs", "Playlists", "Genres");

	for (var i = 0; i < choices.length; i++) {
		var x = 150;
		if (i == 0 || i == choices.length - 1) {
			x = 200;
		} else if (i == 1 || i == choices.length - 2) {
			x = 165;
		}
		createDiv(x, 130 + 80 * i, choices[i], 100, 50);
	};	
	
	selectionPath = "";
	currentChoice = "";
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

}


function onTouchStart(e) {
	e.preventDefault();
	var x = e.targetTouches[0].pageX;
	var y = e.targetTouches[0].pageY;
	onMove(x, y);
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
			topOfWheel = "";
			currentChoice = choices[i]
			$("#nav").html(currentChoice);
			selectionPath = currentChoice;
			populateNewWheel(false, i);
		}
	}
	if (y > 200 && y < 400 && x > 450 && x < 900) {
		currentChoice = choices[i];
		changePath(currentChoice, i);
	}
}

// Was choice - choice or select button?
// name = name of button
function changePath(name, num) {
	selectionPath += "/" + topOfWheel;
	$("#nav").html(selectionPath);
	populateNewWheel(true, num);
}


//choices = new Array("Artists", "Albums", "Songs", "Playlists", "Genres");
//use indices
function populateNewWheel(currentlyNavigating, num) {
	var info;
	if (!currentlyNavigating) {
		if (num == 0) {			//artists -> display all albums
			info = getArtists();
		} else if (num == 1) {	//albums -> display all songs in that album
			info = getAlbums();
		} else if (num == 2) {	// Songs -> all songs on this album
			info = getSongs();
		} else if (num == 3) {  // Playlists -> display all playlists
			info = getPlaylists();
		} else {				// genre - display songs by genre
			info = getGenres();
		}
	} else {					// 
		
	}

	generateWheelChoices(info);

}





function generateWheelChoices(info) {
	$(".options").remove();
	var x = 350;
	var y = 300;
	var middle = 1;
	for (var i = 0; i < 3; i++) {
		var name = info[i];
		if (name != null) {
			if (i == middle) {
				
				y = 190;
			} else if (i == 2) {
				x = 600;
				y = 300;
			}
			if (i != middle && name != null && name.length >= 8) {
				name = name.substring(0, 5) + "...";
			} else if (i == middle && name.length >= 8) {
				x = 460;
			}
			var newDiv = document.createElement("div");
			newDiv.style.position = "absolute";
			newDiv.style.left = x + 'px';
			newDiv.style.top = y + 'px';
			newDiv.className = 'options';
			newDiv.innerHTML = info[i];
			$('#container').append(newDiv);
		}
	}

}

function displayInfo(info) {
	$("#options").html(info);
}