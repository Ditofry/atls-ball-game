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

// Square can defend
// Triangle can attack
// Ball can collect
$(window).bind("load", function() {
  //Variables representing the canvas and the canvas' context (the context is used for actually drawing on the canvas)
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  //The ball that we will be drawing on the canvas
  var ball = {
    x: canvas.width / 2, //the x location of the ball
    y: canvas.height / 2, //the y location of the ball
    radius: 10, //the radius of the ball
    fillColor: "red", //what color should the ball be
    strokeColor: "grey", //what color should the outline of the ball be
    velocity_x: 0, //how fast the ball will move in the x direction
    velocity_y: 0,
    max_vel: 5,
    accel_rate: 1 // keep it linear for now
  }; //how fast the ball will move in the y direction

  var fps = 0,
      framesThisSecond = 0;

  setInterval(function(){ fps = framesThisSecond; framesThisSecond = 0; }, 1000);

  //start us off the first time
  requestAnimationFrame(mainLoop);

  //Game Loop
  function mainLoop() {
    processInput();
    update();
    draw();

    setTimeout(function(){
      framesThisSecond++;
      // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
      // Good explanation http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
      requestAnimationFrame(mainLoop);
    }, 1000/40);
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
    // Stop on keyup.  May need to un-DRY in else if key-smashing multipl
    // directions causes strange behaviour
    // keyup is not defined?! That is pure malarky
    // if (keyup.left) {
    //   ball.velocity_x = 0;
    // }
    // if (keyup.right) {
    //   ball.velocity_x = 0;
    // }
    // if (keyup.up) {
    //   ball.velocity_y = 0;
    // }
    // if (keyup.down) {
    //   ball.velocity_y = 0;
    // }
  }

  // Update state
  function update() {
    ball.x += ball.velocity_x;
    ball.y += ball.velocity_y;

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

    context.fillText("FPS " + fps, 15, 15);
  }

});
