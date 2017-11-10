
var randomNumber;
var totalScore;
var wins = 0;
var losses = 0;

var crystalValues = [];
var crystalValue = 0;

//Function to generate random integer between two values
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function generateCrystalValues() {
	//Generate unique random numbers for each crystal
	for (var i = 0; i < 4; i++){
		while(crystalValues.length < i + 1) {

			crystalValue = getRandomInt(1, 13);
			if (crystalValues.indexOf(crystalValue) === -1){
				crystalValues.push(crystalValue);
			}

		}
	}
}

function setupCrystals() {
	//Setting up crystals
	for (var i = 0; i < crystalValues.length; i++) {

		$("#crystal" + i).empty();

	    // For each iteration, creating an imageCrystal
	    var imageCrystal = $("<img>");

	    // First each crystal will be given the class "img-responsive".
	    // This will make the images responsive-friendly in bootstrap 3
	    imageCrystal.addClass("img-responsive img-crystal");

	    // Each imageCrystal will be given a src link to the crystal image
	    imageCrystal.attr("src", "assets/images/crystal" + i + ".png");
	    imageCrystal.attr("alt", "crystal" + i);

	    // Each imageCrystal will be given a data attribute called data-crystalValue.
	    // This data attribute will be set equal to the array value.
	    imageCrystal.attr("data-crystalvalue", crystalValues[i]);

	    // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
	    $("#crystal" + i).append(imageCrystal);
	}
}

function resetGame() {
	randomNumber = getRandomInt(19, 121);
	totalScore = 0;
	crystalValues = [];
	generateCrystalValues();
	setupCrystals();
	$("#random-number").text(randomNumber);
	$("#total-score").text(totalScore);
	$("#wins").text(wins);
	$("#losses").text(losses);
}

resetGame();

$(document).on('click','.img-crystal', function() {

    // Determining the crystal's value requires us to extract the value from the data attribute.
    var crystal = ($(this).attr("data-crystalvalue"));
    crystal = parseInt(crystal);

    // Every click from every crystal adds to the total score.
    totalScore += crystal;

    // All of the same game win-lose logic applies. So the rest remains unchanged.
    $("#total-score").text(totalScore);

    if (totalScore === randomNumber) {
      alert("Winner Winner Chicken Dinner!\n\nTotal Score: " + totalScore + '\nRandom Number: ' + randomNumber);
      wins++;
      resetGame();
    }

    else if (totalScore >= randomNumber) {
      alert("Loser!\n\nTotal Score: " + totalScore + '\nRandom Number: ' + randomNumber);
      losses++;
      resetGame();
    }

});

