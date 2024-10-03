var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var hasstarted = false;
var level = 0;


$(document).keypress(function(){
   if (!hasstarted){
      $("#level-title").text("level " + level);
      nextSequence();
      hasstarted = true;
   }
   
})

$(".btn" ).on( "click", function() {
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length - 1); // Pass the index of the last user input
   
 } );

function nextSequence(){
   userClickedPattern = [];
   level++;
   $("#level-title").text("level " + level);
   var randomNumber = Math.floor(Math.random() * 4);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
   $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);  
   playSound(randomChosenColour);
   
}
function playSound(name){
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}

function animatePress(currentColour){
   $("#" + currentColour).addClass("pressed");
   setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");
      //....and whatever else you need to do
}, 100);
}

function checkAnswer(currentLevel){
   if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){
      console.log("correct");
      if (userClickedPattern.length === gamePattern.length){
         setTimeout(function() {
            nextSequence();
            
         }, 1000);
      } //on verificie si l'utilisateur a choisi les bons sequences

   }else{
      console.log("wrong");
      var audio = new Audio("./sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over")

      setTimeout(function() {
         $("body").removeClass("game-over");  // Remove the class after 200 milliseconds
      }, 200);  // Delay of 200 milliseconds before removing the class

      $("#level-title").text("Game Over, Press Any Key to Restart" );

      startOver()
      
   }
}
function startOver(){
   level = 0;
   gamePattern = [];
   hasstarted = false;

}
