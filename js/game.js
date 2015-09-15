document.addEventListener("keydown",keydownEvent, false);
document.addEventListener("keyup", keyupEvent, false);

function keydownEvent(e) {
 if(!e) {
   e= event;
 }
}
function keyupEvent(e){
 if(!e) {
   e=event;
 }
}

$(window).bind("load", function() {

//Variables representing the canvas and the canvas' context (the context is used for actually drawing on the canvas)
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

//The ball that we will be drawing on the canvas
var ball = {x:canvas.width/2, //the x location of the ball
y:canvas.height/2, //the y location of the ball
radius:10, //the radius of the ball
fillColor:"red", //what color should the ball be
strokeColor:"grey", //what color should the outline of the ball be
velocity_x:0, //how fast the ball will move in the x direction
velocity_y:0}; //how fast the ball will move in the y direction

//start us off the first time
requestAnimationFrame(mainLoop);

//Game Loop
function mainLoop() {
processInput();
update();
draw();

requestAnimationFrame(mainLoop);
}

//Here is where we would read the user's input. We will fill this in later
function processInput() {
if(keydown.left && ball.velocity_x>-3){
 ball.velocity_x=ball.velocity_x-1;
}
if(keydown.right && ball.velocity_x<3){
 ball.velocity_x=ball.velocity_x+1;
}
if(keydown.up && ball.velocity_y>-3){
 ball.velocity_y=ball.velocity_y-1;
}
if(keydown.down && ball.velocity_y<3){
 ball.velocity_y=ball.velocity_y+1;
}
}


//Here is where we would update the state of our game or simulation (e.g., make the ball move). We will fill this in later.
function update() {
ball.x = ball.x+ball.velocity_x;
ball.y=ball.y+ball.velocity_y;

if(ball.x > canvas.width || ball.x<0){
 ball.velocity_x=-ball.velocity_x;
}
if(ball.y>canvas.height || ball.y<0){
 ball.velocity_y=-ball.velocity_y;
}
}

//Draw the scene. Here we simply erase what was previously drawn (e.g., where the ball used to be), then draw it again
function draw() {

//clear our drawing
context.clearRect(0, 0, canvas.width, canvas.height);

//draw the ball
context.beginPath();
context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
context.fillStyle = ball.fillColor;
context.fill();
context.lineWidth = 1;
context.strokeStyle = ball.strokeColor;
context.stroke();
//context.closePath();
}

});
