
var buttoncolors = ["red", "blue", "green", "yellow"];

var gamepattern = [];
var userclickedpattern = [];

var level = 0;
var started = false;

$(document).keypress(function () {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextsequence();
    started = true;
  }
});

$(".btn").click(function () {

  var userchosencolor = $(this).attr("id");
  userclickedpattern.push(userchosencolor);

  playSound(userchosencolor);
  animatepress(userchosencolor);

  checkans(userclickedpattern.length - 1);
})

function checkans(currlevel) {

  if (gamepattern[currlevel] === userclickedpattern[currlevel]) {
    if (gamepattern.length === userclickedpattern.length) {
      setTimeout(function () {
        nextsequence();
      }, 1000)
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over,Press Any Key to Restart ");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startover();
  }
}

function nextsequence() {
  userclickedpattern = [];
  level++;

  $("#level-title").text("Level" + level);

  var randomnum = Math.floor(Math.random() * 4);

  var randomcolor = buttoncolors[randomnum];

  gamepattern.push(randomcolor);

  $("#" + randomcolor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomcolor);
}


function animatepress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startover() {
  gamepattern = [];
  level = 0;
  started = false;
}