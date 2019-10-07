// global variables
var wordList = [
    "afghanistan", "albania", "algeria", "andorra", "angola", "antigua",
    "argentina", "armenia", "australia", "austria", "azerbaijan", "bahamas", "bahrain",
    "bangladesh", "barbados", "belarus", "belgium", "belize", "benin", "bhutan", "bolivia",
    "bosnia", "botswana", "brazil", "brunei", "bulgaria", "burkina faso", "burundi",
    "cabo verde", "cambodia", "cameroon", "canada", "central african republic", "chad", "chile",
    "china", "colombia", "comoros", "congo", "costa rica", "cote d ivoire", "croatia", "cuba",
    "cyprus", "czech republic", "denmark", "djibouti", "dominica", "dominican republic",
    "east timor", "ecuador", "egypt", "el salvador", "equatorial guinea", "eritrea", "estonia",
    "eswatini", "ethiopia", "fiji", "finland", "france", "gabon", "the gambia", "georgia",
    "germany", "ghana", "greece", "grenada", "guatemala", "guinea", "guinea bissau", "guyana",
    "haiti", "honduras", "hungary", "iceland", "india", "indonesia", "iran", "iraq", "ireland",
    "israel", "italy", "jamaica", "japan", "jordan", "kazakhstan", "kenya", "kiribati",
    "north korea", "south korea", "kosovo", "kuwait", "kyrgyzstan", "laos", "latvia", "lebanon",
    "lesotho", "liberia", "libya", "liechtenstein", "lithuania", "luxembourg", "madagascar", "malawi",
    "malaysia", "maldives", "mali", "malta", "marshall islands", "mauritania", "mauritius",
    "mexico", "federated states of micronesia", "moldova", "monaco", "mongolia", "montenegro",
    "morocco", "mozambique", "myanmar", "namibia", "nauru", "nepal", "netherlands", "new zealand",
    "nicaragua", "niger", "nigeria", "north macedonia", "norway", "oman", "pakistan", "palau",
    "panama", "papua new guinea", "paraguay", "peru", "philippines", "poland", "portugal", 
    "qatar", "romania", "russia", "rwanda", "saint kitts and nevis", "saint lucia", 
    "saint vincent and the grenadines", "samoa", "san marino", "sao tome and principe",
    "saudi arabia", "senegal", "serbia", "seychelles", "sierra leone", "singapore", "slovenia",
    "solomon islands", "somalia", "south africa", "spain", "sri lanka", "sudan", "south sudan",
    "suriname", "sweden", "switzerland", "syria", "taiwan", "tajikistan", "tanzania", "thailand",
    "togo", "tonga", "trinidad and tobago", "tunisia", "turkey", "turkmenistan", "tuvalu", "uganda",
    "ukraine", "united arab emirates", "united kingdom", "united states", "uruguay", "uzbekistan", 
    "vanuatu", "vatican city", "venezuela", "vietnam", "yemen", "zambia", "zimbabwe"
]
var wordIndex = 0;
var currentWord = "";
var gameWord;
var guesses = [];
var remainingGuesses = 8;
var lastGuessArray = [];
var isFinished = false;


// requirements
var Word = require('./word.js');
var inquirer = require('inquirer');


// game setup
var createWord = function() {
    wordIndex = Math.floor(Math.random() * wordList.length);
    currentWord = wordList[wordIndex];
    currentWord.toLowerCase();
    gameWord = new Word(currentWord);
}


var resetGame = function() {
    remainingGuesses = 8;
    guesses = [];
    lastGuessArray = [];
    isFinished = false;
}


// gameplay
var gamePlay = function() {

    // create new word for this game
    createWord();
    console.log("The Category is Countries. Good Luck!");
    console.log("\n" + gameWord.showWord() + "\n");
    makeGuess();


    // takes in a letter from user and checks if it is in the array and displays.
    function makeGuess() {
        if (!isFinished) {
            if (remainingGuesses > 0) {
                inquirer.prompt([
                    { 
                    name: "input",
                    message: "Please guess a letter -> ",
                    }
                ]).then(function(answer) {

                    if (guesses.indexOf(answer.input) === -1) {

                        // checks if guess is correct
                        gameWord.userGuess(answer.input);

                        // adds guess to list of guesses
                        guesses.push(answer.input);

                        // updates gameplay in console
                        console.log("\n" + "Guessed Letters: " + guesses.join(", "));
                        console.log("\n" + gameWord.showWord() + "\n");
                        
                        checkGuess();
                    }

                    // already guessed letter, guess again
                    else {
                        console.log("\n" + "Please guess a new letter");
                    }

                    makeGuess();
                });
            }
            else {

                // user is out of guesses, game over
                console.log("\n" + "********* GAME OVER **********" + "\n");
                isFinished = true;
                playAgain();
            }
        }
        else {
            console.log("\n" + "********** YOU WIN! **********" + "\n")
            playAgain();
        }
    }


    function checkGuess() {
        
        // array to save the most recent instance of the game
        var thisTurnArray = [];

        // create the most recent instance array 
        for (var i=0; i < gameWord.letterArray.length; i++) {
            thisTurnArray.push(gameWord.letterArray[i].isGuessed);
        }

        // if the arrays are the same, the guess was wrong
        if (JSON.stringify(lastGuessArray) === JSON.stringify(thisTurnArray)) {
            remainingGuesses--;
        }

        if (thisTurnArray.indexOf(false) === -1) {
            isFinished = true;
        }

        // update last turn array before next turn
        lastGuessArray = thisTurnArray;
    }
}


function playAgain() {

    inquirer.prompt([
        {
            type: "confirm",
            name: "playAgain",
            message: "Would you like to play again?",
        }
    ]).then(function(response) {

        if (response.playAgain) {
            console.log("\n" + "Alright! Let's Play!" + "\n");
            resetGame();
            gamePlay();
        }
        else {
            console.log("\n" + "Thanks for playing! Seeya!" + "\n")
        }
    })
}


// starts first game
gamePlay();


