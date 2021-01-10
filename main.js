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
    this.r = 6 + 12 * Math.random()
    this.color = colorPallete[Math.floor(Math.random() * colorPallete.length)];
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.r -= .01;
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

  if (Math.random() > .2)
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

document.addEventListener("mousemove", handleMouse);

renderCircles();
