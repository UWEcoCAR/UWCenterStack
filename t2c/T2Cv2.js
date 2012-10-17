var debug;
var tl;
var tr;
var bl;
var br;
var corners;

var width;
var height;

var lastX;
var lastY;
var startX;
var startY;
var startDate;
var pathL;
var isDown = false;

var corner_size = 200;
var max_time = 1000;
var sensitivity = 300;
var directness = 1.2;

var c;

function onStart() {
	document.addEventListener("touchstart", onTouchStart, false);
	document.addEventListener("touchmove", onTouchMove, false);
	document.addEventListener("touchend", onTouchEnd, false);
//	document.addEventListener("touchcancel", onTouchCancel, false);
	
	debug = document.getElementById("coord");
	tl = document.getElementById("tl");
	tr = document.getElementById("tr");
	bl = document.getElementById("bl");
	br = document.getElementById("br");
	corners = document.getElementsByClassName("corner");
	
	width = window.innerWidth;
	height = window.innerHeight;
	
	for (var i = 0; i < 4; i++){
		corners[i].style.setProperty("-webkit-transition", "width 0s, height 0s, margin 0s");
	}
}

function onTouchStart(e){
//	e.preventDefault();
	lastX = e.targetTouches[0].pageX;
	lastY = e.targetTouches[0].pageY;
	startX = lastX;
	startY = lastY;
	startDate = new Date();
	pathL = 0;
	isDown = true;
	debug.style.background="blue";
	debug.innerHTML = "started";
	
	for (var i = 0; i < 4; i++){
		corners[i].style.setProperty("-webkit-transition", "width 0s, height 0s, margin 0s");
	}
}

function onTouchMove(e){
	e.preventDefault();
	pathL += Math.sqrt(Math.pow(lastX -e.targetTouches[0].pageX, 2) + Math.pow(lastY-e.targetTouches[0].pageY, 2));
	lastX = e.targetTouches[0].pageX;
	lastY = e.targetTouches[0].pageY;
	debug.innerHTML = "(" + lastX + "/" + width +", " + lastY + "/" + height +")";
	drawCorner(distance(0,0,lastX,lastY), tl);
	drawCorner(distance(width,0,lastX,lastY), tr);
	drawCorner(distance(0,height,lastX,lastY), bl);
	drawCorner(distance(width,height,lastX,lastY), br);
}

function onTouchEnd(e){
	isDown = false;
	debug.innerHTML = "Time = " + (new Date().getTime() - startDate.getTime()) + 
	"<br />Distance = " + pathL + 
	"<br />Displacement = " + distance(lastX, lastY, startX, startY) + 
	"<br />Distance/Displacement = " + pathL/distance(lastX, lastY, startX, startY);
	
//	e.preventDefault();
	if(new Date().getTime()-startDate.getTime() <= max_time && distance(lastX, lastY, startX, startY)*directness > pathL && click(lastX, lastY)){
		debug.style.background = "green";
	} else {
		debug.style.background = "red";
	}

	for (var i = 0; i < 4; i++){
		corners[i].style.setProperty("-webkit-transition", "width .6s, height .6s, margin .6s");
	}

	
	for (var i = 0; i < 4; i++){
		corners[i].style.width="200px";
		corners[i].style.height="200px";
		corners[i].style.margin="-100px";
	}
}

function click(x, y){
	if (distance(x,y, 0, 0) < 125){
		c = "tl";
	} else if (distance(x,y, width, 0) < 125){
		c = "tr";
	} else if (distance(x,y, 0, height) < 125){
		c = "bl";
	} else if (distance(x,y, width, height) < 125){
		c = "br";
	} else {
		c = "no"
	}
	debug.innerHTML = debug.innerHTML + "<br />" + c;
	if (c != "no"){
		return true;
	}
	return false;	
}

function drawCorner(distance, corner){
	var size = Math.max((((sensitivity+corner_size)/2-distance)/sensitivity)*200+200, 200);
	corner.style.width = corner.style.height = size + "px";
	corner.style.margin = -size/2 +"px";
}

function distance(x1, y1, x2, y2){
	return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
}

function onClick(){
	debug.style.background="orange";
}