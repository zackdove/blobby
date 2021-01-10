const canvas = document.getElementById("canvas"),
context = canvas.getContext("2d"),
colorPallete = ["#00f", "#00a", "#00b", "#00c", "#00d", "#00e"];

var width = canvas.width = window.innerWidth;
var  height = canvas.height = window.innerHeight;
// Initially set to canvas half width/height, then set to mouse
var src = {
	x: width / 2,
	y: height / 2
}
var  circles = [];
var mouseX = width/2;
var mouseY = height/2;
var minDist = 200;
const splashTitle = document.getElementById("splashTitleText");
const boundingRect = splashTitle.getBoundingClientRect();
var numCircles = 60;

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

function setColorPallete(base){
	
}

class Circle {
	constructor() {
		// Change to set the boundaries of where the random circles lay
		var minX = boundingRect.left + 200;
		var maxX = boundingRect.right - 200;
		var minY = boundingRect.top;
		var maxY = boundingRect.bottom;
		this.x = Math.round(minX + Math.random() * (maxX - minX));
		this.y = Math.round(boundingRect.top + Math.random() * (boundingRect.bottom - boundingRect.top));
		this.angle = Math.PI * 2 * Math.random();
		this.speed=0.2 + Math.random();
		this.vx = this.speed* Math.cos(this.angle);
	    this.vy = this.speed* Math.sin(this.angle);
		this.r = 6 + 26 * Math.random()
		this.color = colorPallete[Math.floor(Math.random() * colorPallete.length)];
	}
	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.speed = this.speed * 0.98;
		this.vx = this.speed* Math.cos(this.angle);
	    this.vy = this.speed* Math.sin(this.angle);
		// this.r -= .01;
		
		if (this.distFrom(mouseX, mouseY) < minDist){
			this.speed = 1;
		}
		
	}
	distFrom(x2, y2){
		var dx = this.x - x2;
		var dy = this.y - y2;
		return Math.sqrt((dx*dx)+(dy*dy));
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

function drawInitialCircles(){
	
	for (var i = 0; i < numCircles; i++){
		circles.push(new Circle());
		
		
	}
}

function renderCircles() {
	context.clearRect(0, 0, width, height);
	
	// if (Math.random() > .2)
	//   circles.push(new Circle());
	
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

document.addEventListener("mousemove", handleMouse);

drawInitialCircles();
renderCircles();
