var gamePattern = []; //to store random color pattern generated by computer
var buttonColors = ["red", "blue", "green", "yellow"]; //button color array to choose from
var userClickedPattern = []; //to store User click pattern
var level = 0; //keeping track of Game level


var started = false; //flag to know if the keyboard key is pressed to start the game. True means keyboard key pressed
var currentLevel; //passing the length of the array to checkAnswer() function
var counter = 0; //counter to display game pattern sequence to user
var randomChosenColor;

/*Function to start the game by pessing any keypress
using started variable to only allow one keypress to start the game and
then after it will reset once player plays a wrong move
*/
$(document).on("keydown", function() {
  if (!started) {
    nextSequence(); //calling next sequence function which will generate random number
    $("#level-title").text("Level " + level); //chnaging the Title as level
    started = true; //changing it to True so that any more keypress has no affect
  }
});


/*Function to generate rendom color ad put it into gamePattern array and playing
color approprite sound and incrementing level
*/
function nextSequence() {
  randomNumber = Math.floor(Math.random() * 4); //generate random number between 0-3
  randomChosenColor = buttonColors[randomNumber]; //choosing the right color from buttonColor array
  gamePattern.push(randomChosenColor); //pushing the random color to gamePattern array
  console.log("gamePattern: " + gamePattern);

  level++;
  $("#level-title").text("Level " + level); //updating the level to the Title

  displayGamePattern(counter); //function call to display the gamePAtern colors to player for new level


}

/*This Function is a recursive function(calling itself inside the function)
Cannot use For loop since its it blocks the timeout
*/
function displayGamePattern(counter) {


  if (counter < gamePattern.length) {
    setTimeout(function() {
      $("#" + gamePattern[counter]).fadeOut(100).fadeIn(100);
      playSound(gamePattern[counter]);

      counter++;
      displayGamePattern(counter); //calling the function in itself
    }, 900); //will display every color to player in 900ms
  }

}



/*Function to take user input as mouse click, this button selection will store in
an arrray called userClickedPattern and passing the lenght of it to checkAnswer function
where all the comparison happens with gamePattern array and userClickedPattern array
*/
$(".btn").on("click", function(event) {
  var userChosenColor = this.id;
  playSound(userChosenColor);
  animatePress(userChosenColor);

  userClickedPattern.push(userChosenColor);

  checkAnswer(userClickedPattern.length - 1); //passing the lenght -1 (last index) of the array
})




/* Function to check the answer of random pattern with user gamePattern.
If the element clicked by user is wrong then it will go to else loop and execute
other code
*/
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //check to see if the element clicked by user is same as random generated element
    if (gamePattern.length === userClickedPattern.length) { //this will wait for user to same number of element
      setTimeout(function() {
        userClickedPattern = []; //empting the userClickedPattern so that for next level
        nextSequence();
      }, 1000);
    }
  } else { //when the user input is wrong then it will go inside else
    $("#level-title").text("Game Over, Press Any Key to Restart");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }

}


//function to add the "pressed" class to add the clicked effect
function animatePress(currentColor) {
  var activeColor = "#" + currentColor;
  $(activeColor).addClass("pressed");

  setTimeout(function() {
    $(activeColor).removeClass("pressed");
  }, 100);

}


//Function to play chosen color sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


//Funtion to start Over after wrong nextSequence
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  counter = 0;
}
