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
	currentChoice = 0;
}

// For touch screen, sets up options for music app
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

// for buttons, mouse interactino only
function buttonClick(clickedButton) {
	$("#nav").html(clickedButton);
}

// Mouse click, see if we touch anything
function onMouseDown(e) {
	onStart(e.pageX, e.pageY);
}

// Drag across the screen, do nothing
function onTouchMove(e) {
	e.preventDefault();
}

// Touch started, see what they are touching
function onTouchStart(e) {
	e.preventDefault();
	var x = e.targetTouches[0].pageX;
	var y = e.targetTouches[0].pageY;
	onMove(x, y);
}

// Finished touching
function onTouchEnd(e) {
	e.preventDefault();
}

// Called when a user touches or clicks the screen
// Determines what button might have been touched
// updates the information based on what button was touched
function onStart(x, y) {
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
			currentChoice = i;
			topOfWheel = choices[i];
			$("#nav").html(topOfWheel);
			selectionPath = topOfWheel;
			populateNewWheel(i);
		}
	}
	if (y > 200 && y < 400 && x > 450 && x < 900) { 
		topOfWheel = $(".options")[1];
		changePath(topOfWheel.innerHTML);
		generateSpecificChoices(topOfWheel.innerHTML);
		// move from artists -> album -> song
		currentChoice++;
	}

}

// Takes in the name of a button and changes the
// selection path to include that name
function changePath(name, num) {
	selectionPath += "/" + name;
	$("#nav").html(selectionPath);
}

// Gets the next information to be displayed around the wheel
// Determines what to display based on the num passed and choices array
// choices = new Array("Artists", "Albums", "Songs", "Playlists", "Genres");
function populateNewWheel(num) {
	var info;
	if (!currentlyNavigating) {
		if (num == 0) {			//artists -> display all artists
			info = getArtists();
		} else if (num == 1) {	//albums -> display all albums
			info = getAlbums();
		} else if (num == 2) {	// Songs -> all songs
			info = getSongs();
		} else if (num == 3) {  // Playlists -> display all playlists
			info = getPlaylists();
		} else {				// genre -> display all genres
			info = getGenres();
		}
	}
	generateWheelChoices(info);
}

// Takes in a string of data representing an album name, artist, song, etc
// Displays the information for that specific choice
function generateSpecificChoices(data) {
	var info;
	if (currentChoice == 1) {			//artists -> display all albums by this artist
		info = getAlbums(data);
		generateWheelChoices(info);
	} else if (currentChoice == 2) {	//albums -> display all songs in that album
		info = getSongs(data);
		generateWheelChoices(info);
	} else if (currentChoice == 3) {	// Songs -> now playing
		//now playing
		$(".options").remove();
	} else if (currentChoice == 4) {  	// Playlists -> display all playlists
		generateWheelChoices(getSongs(data));
	} else {							// genre - display songs by genre
		generateWheelChoices(getSongs(data));
	}

}

// Removes all of the existing choices around the wheel
// and displays the new choices from the given information
// the information is an array of artists, songs, albums, etc
function generateWheelChoices(info) {
	$(".options").remove();
	var x = 350;
	var y = 300;
	var middle = 1;
	// currently only displays 3 around the wheel
	// left, top, middle
	for (var i = 0; i < 3; i++) {
		var name = info[i];
		if (name != null) {
			//alignment around wheel
			if (i == middle) {
				y = 190;
			} else if (i == 2) {
				x = 600;
				y = 300;
			}
			// clip the length of the string
			if (i != middle && name != null && name.length >= 8) {
				name = name.substring(0, 5) + "...";
			} else if (i == middle && name.length >= 8) {
				x = 460;
			}
			// create new choices
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