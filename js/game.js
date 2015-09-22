document.addEventListener("keydown",keydownEvent, false);
document.addEventListener("keyup", keyupEvent, false);

function keydownEvent(e) {
 if (!e) {
   e = event;
 }
}
function keyupEvent(e){
 if (!e) {
   e = event;
 }
}

var maxFps = 60;
var slowMoLevel = 1;
function updateFrameRate(newFrameRate){
  maxFps = newFrameRate;
  document.getElementById("FrameRateLabel").innerHTML = maxFps;
}
function goSlowMo(newLevel){
  slowMoLevel = newLevel;
  document.getElementById("sloMoLabel").innerHTML = slowMoLevel;
}
// Square can defend
// Triangle can attack
// Ball can collect
$(window).bind("load", function() {
  //Variables representing the canvas and the canvas' context (the context is used for actually drawing on the canvas)
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  // Where we store interpolated values
  var circLastXPos, circLastYPos;
  // Track global slow motion mode, higher slowMoLevel values == slower mo
  var delta = 0;


  //The ball that we will be drawing on the canvas
  var ball = {
    x: canvas.width / 2, //the x location of the ball
    y: canvas.height / 2, //the y location of the ball
    radius: 10, //the radius of the ball
    fillColor: "red", //what color should the ball be
    strokeColor: "grey", //what color should the outline of the ball be
    velocity_x: 0, //how fast the ball will move in the x direction
    velocity_y: 0,
    max_vel: 1,
    accel_rate: 0.05 // keep it linear for now
  }; //how fast the ball will move in the y direction

  var fps = 0,
      framesThisSecond = 0,
      timestep = 60; // update loop occurs 60 times per sec

  setInterval(function(){ fps = framesThisSecond; framesThisSecond = 0; }, 1000);

  var lastFrameTimeMs = 0;

  //start us off the first time
  requestAnimationFrame(mainLoop);

  //Game Loop
  function mainLoop(timestamp) {
    if (timestamp - lastFrameTimeMs < (1000 / maxFps)) {
      requestAnimationFrame(mainLoop);
      return;
    }
    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;

    processInput();
    var numUpdateSteps = 0;
    while (delta >= timestep) {
        update(timestep / slowMoLevel);
        delta -= timestep;
        if (++numUpdateSteps >= 240) {
            delta = 0;
            break;
        }
    }
    framesThisSecond++;
    draw(delta / timestep);
    requestAnimationFrame(mainLoop);
  }

  // Handles user input
  function processInput() {
    // Left
    if (keydown.left && ball.velocity_x > -ball.max_vel) {
     ball.velocity_x -= ball.accel_rate;
    }
    // Right
    if (keydown.right && ball.velocity_x < ball.max_vel) {
     ball.velocity_x += ball.accel_rate;
    }
    // Up
    if (keydown.up && ball.velocity_y > -ball.max_vel) {
     ball.velocity_y -= ball.accel_rate;
    }
    // Down
    if (keydown.down && ball.velocity_y < ball.max_vel) {
     ball.velocity_y += ball.accel_rate;
    }
    if (keydown.space) {
     ball.velocity_y = 0;
     ball.velocity_x = 0;
    }
  }

  // Update state
  function update(delta) {
    // Save new ball position
    circLastXPos = ball.x;
    circLastYPos = ball.y;

    ball.x += ball.velocity_x * delta;
    ball.y += ball.velocity_y * delta;

    if (ball.x > canvas.width){
     ball.x = canvas.width;
     ball.velocity_x *= -1;
    }
    if (ball.x < 0){
     ball.x = 0;
     ball.velocity_x *= -1;
    }
    if (ball.y > canvas.height){
     ball.y = canvas.height;
     ball.velocity_y *= -1;
    }
    if (ball.y < 0){
     ball.y = 0;
     ball.velocity_y *= -1;
    }
  }

  //Draw the scene. Here we simply erase what was previously drawn (e.g., where the ball used to be), then draw it again
  function draw(interp) {
    //clear our drawing
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Set interpolated values
    var xPos = (circLastXPos + (ball.x - circLastXPos) * interp);
    var yPos = (circLastYPos + (ball.y - circLastYPos) * interp);

    //draw the ball
    context.beginPath();
    context.arc(xPos, yPos, ball.radius, 0, 2 * Math.PI, false);
    context.fillStyle = ball.fillColor;
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = ball.strokeColor;
    context.stroke();
    //context.closePath();

    context.fillText("FPS " + fps, 15, 15);
  }

});
