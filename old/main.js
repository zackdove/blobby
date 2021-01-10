const canvas = document.getElementById("canvas"),
context = canvas.getContext("2d");

var width = canvas.width = window.innerWidth;
var  height = canvas.height = window.innerHeight;
// Initially set to canvas half width/height, then set to mouse
var src = {
	x: width / 2,
	y: height / 2
}
var  circles = [];
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
var baseColour = blue;

window.onresize = function() {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
	src.x= width / 2;
	src.y= height / 2;
}

// Change mouse pos, e is event from addEventListener
function handleMouse(e){
	src.x = e.clientX;
	src.y = e.clientY;
}

function setColorPallete(base){
	
}

class Circle {
	constructor() {
		this.x = src.x;
		this.y = src.y;
		this.angle = Math.PI * 2 * Math.random();
		var speed=1 + Math.random();
		this.vx = speed* Math.cos(this.angle);
		this.vy = speed* Math.sin(this.angle);
		this.r = 6 + 18 * Math.random()
		this.color = this.getColour();
	}
	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.r -= .01;
	}
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

function renderCircles() {
	context.clearRect(0, 0, width, height);
	
	if (Math.random() > .4)
	circles.push(new Circle());
	
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

var colourIndex = 0;
function handleClick(){
	colourIndex++;
	colourIndex = colourIndex % (colours.length);
	baseColour = colours[colourIndex];
}

document.addEventListener("mousemove", handleMouse);
document.addEventListener("click", handleClick);
renderCircles();
