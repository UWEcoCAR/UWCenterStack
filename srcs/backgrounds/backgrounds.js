
var images;
var count;

window.onload = function onLoad() {	
	
	// Add touch handlers
	document.addEventListener("touchstart", onTouchStart, false);
	document.addEventListener("touchmove", onTouchMove, false);
	document.addEventListener("touchend", onTouchEnd, false);
	
	// Add mouse handlers
	// NONE OF THESE ARE NEEDED FOR TOUCHSCREEN
	document.addEventListener("mousedown", onMouseDown, false);
	document.addEventListener("mouseup", onMouseUp, false);
	document.addEventListener("mousemove", onMouseMove, false);
	
	count = 0;
	images = new Array(
		'carbon-fiber-textures.jpg',
		'DarkerLeather-01.png',
		'MapleBurl-01.png',
		'asfalt.png',
		'black_mamba.png',
		'black-Linen.png',
		'carbon_fibre.png',
		'dark_dotted.png',
		'dark_geometric.png',
		'dark_leather.png',
		'dark_mosaic.png',
		'dark_Tire.png',
		'dark_wood.png',
		'darkdenim3.png',
		'dvsup.png',
		'hexabump.png',
		'navy_blue.png',
		'noisy_net.png',
		'office.png',
		'pw_maze_black.png',
		'pw_maze_white.png',
		'rebel.png',
		'rubber_grip.png',
		'squares.png',
		'txture.png',
		'use_your_illusion.png',
		'wild_oliva.png'

	);
}

function onStart() {

}

function onEnd() {

}

function onTouchStart() {
	
}

function onTouchEnd() {
	onEnd();
}

function onMouseDown() {
	
}

function onMouseUp() {
	onEnd();
}


/*
 * Updates the Background to the next in the list every other click
 * On clicks in between, reveals the name of the image shown
 */


function onMove() {
	count++;
	if (count == images.length * 2) {
		count = 0;
	}
	var half = Math.floor((count-1)/2);
	var picture = Math.min(half + 1, images.length);
	if (count % 2 == 0) {
		$('#imageName').text(images[half].substring(0, images[half].length - 4));
	} else {
		$('#imageName').text('');
		$('body').css('background-image', 'url(./images/' + images[half] + ')');
	}

	
	
}

function onTouchMove() {
	onMove();
}

function onMouseMove() {
	onMove();
}