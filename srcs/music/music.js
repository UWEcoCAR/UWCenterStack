var choices;
var navOptions;
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

	
	//set up the buttons
	for (var i = 0; i < choices.length; i++) {
		var x = 150;
		if (i == 0 || i == choices.length - 1) {
			x = 200;
		} else if (i == 1 || i == choices.length - 2) {
			x = 165;
		}
		createDiv(x, 130 + 80 * i, choices[i], 100, 50, 'buttons');
	};
	
	navOptions = new Array("", "", "", "", "");
	changeNav(navOptions);
	
	selectionPath = "";
	currentChoice = 0;

	var wheelX = $("#select").position.x;
	var wheelY = $("#select").position.y;
}

// Sets up the top Navigation semi circle with the given array of options
function changeNav(navOptions) {
	$(".navigate").remove();
	for (var i = 0; i < navOptions.length; i++) {
		var x = 150;
		var y = 20;
		if (i == 0 || i == navOptions.length - 1) {
			y = 60;
		} else if (i == 1 || i == navOptions.length - 2) {
			y = 40;
		}
		createDiv(300 + 90 * i, y, navOptions[i], 100, 50, 'navigate');
	};	
}

// For touch screen, sets up options for music app
function createDiv(x, y, value, width, height, whatClass) {
	var newDiv = document.createElement("div");
	newDiv.style.position = "absolute";
	newDiv.style.left = x + 'px';
	newDiv.style.top = y + 'px';
	newDiv.className = whatClass;
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
	var navs = $(".navigate");
	// select button selected
	if (y > 200 && y < 400 && x > 450 && x < 900) { 
		topOfWheel = $(".options")[0];
		changePath(topOfWheel.innerHTML, true);
		currentChoice++;
		generateSpecificChoices(topOfWheel.innerHTML);
		// move from artists -> album -> song
	} else {
		for (var i = 0; i < buttons.length; i++) {
			// determine if it touches any of the buttons
			var buttonWidth = $(buttons[i]).width();
			var buttonHeight = $(buttons[i]).height();
			var buttonX = parseInt(buttons[i].style.left);
			var buttonY = parseInt(buttons[i].style.top);
			// determine which option was pressed
			if (x - buttonX <= buttonWidth && x - buttonX >= 0 &&
					y - buttonY <= buttonHeight && y - buttonY >= 0) {
				currentChoice = i;
				topOfWheel = choices[i];
				changePath(topOfWheel, false);
				selectionPath = topOfWheel;
				populateNewWheel(i);
			}
		}
		for (var i = 0; i < navs.length; i++) {
			var navWidth = $(navs[i]).width();
			var navHeight = $(navs[i]).height();
			var navX = parseInt(navs[i].style.left);
			var navY = parseInt(navs[i].style.top);
			if (x - navX <= navWidth && x - navX >= 0 &&
					y - navY <= navHeight && y - navY >= 0) {
				if (navOptions[i].length != 0) { //valid choice
					// clear out the rest of the information in the nav
					for (var j = i + 1; j < navs.length; j++) {
						$(navs[j]).html("");
					}
					// reset wheel
					
					if (i == 0) { //"All Artists/Playlists/Songs/Etc"
						var musicType = navOptions[0].substring(4).toUpperCase();
						var info;
						//getSongs(artist, album, genre, playlist)
						if (musicType === "ARTISTS") {
							info = getArtists();
						} else if (musicType === "ALBUMS") {
							info = getAlbums();
						} else if (musicType === "PLAYLISTS") {
							info = getPlaylists();
						} else if (musicType === "SONGS") {
							info = getSongs();
						} else {
							info = getGenres();
						}
						generateWheelChoices(info);
					} else {
						var info = navOptions[0];
					}
				}
			}
		}
		//determine if nav touched
		
	}
}

// Takes in the name of a button and changes the
// selection path to include that name
function changePath(name, isSelectButton, num) {
	$("#nav").remove();
	if (!isSelectButton) {
		navOptions = new Array("All " + name, "", "", "", "");
		clickHandler = new Array(populateNewWheel(num));
		changeNav(navOptions);	
	} else {
		var position = 0;
		for (var i = 1; i < navOptions.length; i++) {
			if (navOptions[i].length == 0 && position == 0) {
				position = i;
			}
		}
		navOptions[position] = name;
		changeNav(navOptions);
	}
}

// Gets the next information to be displayed around the wheel
// Determines what to display based on the num passed and choices array
// choices = new Array("Artists", "Albums", "Songs", "Playlists", "Genres");
function populateNewWheel(num) {
	var info;

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
		info = getSongs("", data);
		generateWheelChoices(info);
	} else if (currentChoice == 3) {	// Songs -> now playing
		//now playing
		$(".options").remove();
	} else if (currentChoice == 4) {  	// Playlists -> display all songs for that playlist
		generateWheelChoices(getSongs("", "", "", data));
	} else {							// genre - display songs by genre
		generateWheelChoices(getSongs("", "", data));
	}
	//getSongs(artist, album, genre, playlist)
}

// Removes all of the existing choices around the wheel
// and displays the new choices from the given information
// the information is an array of artists, songs, albums, etc
function generateWheelChoices(info) {
	$(".options").remove();
	var x = 450; 
	var middle = 2; // middle element
	// currently only displays 6 around the wheel
	// left, top right, middle, bottom right, bottom
	for (var i = 0; i < 5; i++) {
		if (info != null) {
			var name = info[i];
			var y = 190 + i * 50;
			if (name != null) {
				// shorten the name
				if (name.length >= 12 && !(i == 0 || i == 4) || name.length > 15) {
					name = name.substring(0, 12) + "...";
				}
				//alignment around wheel
				if (i == middle) {
					x = 600;
				} else if (i == middle - 1 || i == middle + 1) {
					x = 590;
				} else {
					var length
					x = 500 - name.length * 3;
				}
				// clip the length of the string
				// create new choices
				var newDiv = document.createElement("div");
				newDiv.style.position = "absolute";
				newDiv.style.left = x + 'px';
				newDiv.style.top = y + 'px';
				newDiv.className = 'options';
				newDiv.innerHTML = name;
				$('#container').append(newDiv);
			}
		}
	}

}