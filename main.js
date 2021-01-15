const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var blue = {
	red: 0,
	green: 0,
	blue: 255
}
var green = {
	red: 0,
	green: 255,
	blue: 0
}
var yellow = {
	red: 255,
	green: 255,
	blue: 0
}
var red = {
	red: 255,
	green: 0,
	blue: 0
}
var purple = {
	red: 255,
	green: 0,
	blue: 255
}
var colours = [blue, green, yellow, red, purple];
// Randomly select a colour
var baseColour = colours[Math.round(Math.random() * (colours.length-1))];

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
// Initially set to canvas half width/height, then set to mouse
var src = {
	x: width / 2,
	y: height / 2
}
var  circles = [];
var mouseX = 0;
var mouseY = 0;
var minDist = 100;
const splashTitle = document.getElementById("splashTitleText");
const boundingRect = splashTitle.getBoundingClientRect();
var numCircles = 60;

// Handle resize
window.onresize = function() {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
	src.x= width / 2;
	src.y= height / 2;
}

// Change mouse pos, e is event from addEventListener
function handleMouse(e){
	mouseX = e.clientX;
	mouseY = e.clientY;
}

// Circle class
class Circle {
	constructor() {
		// Change to set the boundaries of where the random circles lay
		var minX = boundingRect.left + 200;
		var maxX = boundingRect.right - 200;
		var minY = boundingRect.top;
		var maxY = boundingRect.bottom;
		this.x = Math.round(minX + Math.random() * (maxX - minX));
		this.y = Math.round(boundingRect.top + Math.random() * (boundingRect.bottom - boundingRect.top));
		// Give initial speed, looks more professional
		this.angle = Math.PI * 2 * Math.random();
		this.speed=0.2 + Math.random();
		this.vx = this.speed* Math.cos(this.angle);
	    this.vy = this.speed* Math.sin(this.angle);
		this.r = 6 + 26 * Math.random()
		this.color = this.getColour();
	}
	// Update circle, decay speed
	update() {
		var dist = this.distFrom(mouseX, mouseY)
		if (dist < minDist){
			// +1 to stop being infinite where dist is 0
			this.speed = 200 * 1/(dist+1);
			var dx = this.x- mouseX;
			// Y reversed because coordinate system starts in top left corner
			var dy = this.y - mouseY;
			this.angle = Math.atan2(dy, dx);
			this.r -= .01;
		}
		this.speed = this.speed * 0.98;
		this.vx = this.speed* Math.cos(this.angle);
	    this.vy = this.speed* Math.sin(this.angle);
		this.x += this.vx;
		this.y += this.vy;
	}
	// Get dist from center of circle to point
	distFrom(x2, y2){
		var dx = this.x - x2;
		var dy = this.y - y2;
		return Math.sqrt((dx*dx)+(dy*dy));
	}
	// Randomly dim colour from base colour
	getColour(){
		let mult = 0.6 + Math.random()*0.4;
		let colour = "rgb("+baseColour.red*mult+","+baseColour.green*mult+","+baseColour.blue*mult+")";
		return colour;
	}
}

// Check if circles off edge of screen, then delete
function removeCircles() {
	circles = circles.filter(
		(b) =>
		!(
			b.x + b.r < 0 ||
			b.x - b.r > width ||
			b.y + b.r < 0 ||
			b.y - b.r > height ||
			b.r < 0
		)
	);
}

// Draw initial circles
function drawInitialCircles(){
	for (var i = 0; i < numCircles; i++){
		circles.push(new Circle());
	}
}

// Render circles, recursively
function renderCircles() {
	context.clearRect(0, 0, width, height);
	for (var i = 0; i < circles.length; i++) {
		var b = circles[i];
		context.fillStyle = b.color;
		context.beginPath();
		context.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
		context.fill();
		b.update();
	}
	removeCircles();
	requestAnimationFrame(renderCircles);
}

// Handle when user device is mobile - by moving the blobs automatically
function handleMobile(){
	// Timeout before moving, in ms
	let timeout = 2000;
	// Need to change minimum distance here so that the blobs get moved
	minDist = 200;
	setTimeout(function(){
		mouseX = src.x;
		mouseY = src.y;
		console.log("mouse moved");
	}, timeout);
}

document.addEventListener("mousemove", handleMouse);
window.onload = function() {
	drawInitialCircles();
	renderCircles();
	let mouseQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
	if (!mouseQuery.matches){
		handleMobile();
	}
}

