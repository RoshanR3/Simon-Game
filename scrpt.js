var buttonColours = ["red", "blue", "green", "yellow"];

var userClickPattern=[];

var gamePattern = [];

var started=false;
var level=0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level); 
    nextSequence()
    started=true;
  }
})


$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickPattern.push(userChosenColor);
  PlaySound(userChosenColor);
  animatePress(userChosenColor);
  
  checkAnswer(userClickPattern.length-1)
})

function nextSequence() {
  userClickPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  PlaySound(randomChosenColour);
}

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed")
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed")
  },10);
}

function PlaySound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function startOver(){
  var gamePattern = [];
  
  var level=0;
  var started=false;
}

function checkAnswer(currentlevel){
  if(gamePattern[currentlevel]===userClickPattern[currentlevel]){
    console.log("Success");
    if(userClickPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence()
      },1000)
    }
  }
  else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200)
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}



