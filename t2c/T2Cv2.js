var debug;
var tl;
var tr;
var bl;
var br;

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

function onStart(){
	document.addEventListener("touchstart", onTouchStart, false);
	document.addEventListener("touchmove", onTouchMove, false);
	document.addEventListener("touchend", onTouchEnd, false);
//	document.addEventListener("touchcancel", onTouchCancel, false);
	
	debug = document.getElementById("coord");
	tl = document.getElementById("tl");
	tr = document.getElementById("tr");
	bl = document.getElementById("bl");
	br = document.getElementById("br");
	
	width = window.innerWidth;
	height = window.innerHeight;
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
	shrinkCorner(parseInt(tl.style.width), 200, tl);
	shrinkCorner(parseInt(tr.style.width), 200, tr);
	shrinkCorner(parseInt(bl.style.width), 200, bl);
	shrinkCorner(parseInt(br.style.width), 200, br);
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

function shrinkCorner(state, goal, corner){
	if (state > goal){
//		debug.innerHTML += ", " + corner.style.width;
		s = new Date();
		updateCorner(state, corner);
		setTimeout(shrinkCorner(state-1, goal, corner), 10000);
	}
}

function updateCorner(state, corner){
	corner.style.width =  state + "px";
	corner.style.height = state + "px";
	corner.style.margin = -state/2 +"px";
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