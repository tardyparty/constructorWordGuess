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
var finished = false;


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
    remainingGuesses = 5;
    guesses = [];
}


// gameplay
var gamePlay = function() {

    // create new word for this game
    createWord();
    console.log(gameWord.showWord());
    makeGuess();

    function makeGuess() { 
        if (!finished || remainingGuesses > 0) {
            inquirer.prompt([
                { 
                name: "input",
                message: "Please guess a letter: ",
                }
            ]).then(function(answer) {

                // check if guess was correct and display new word
                if (guesses.indexOf(answer.input) === -1) {

                    console.log(currentWord);
                    gameWord.userGuess(answer.input);
                    guesses.push(answer.input);
                    console.log("Guessed Letters: " + guesses.join(", "));
                    remainingGuesses--;
                    makeGuess();
                }

                // if guess was wrong, decrement remainingGuesses
                if () {
                    remainingGuesses--;
                }

                // already guessed letter, guess again
                else {
                    console.log("Please guess a new letter");
                    makeGuess();
                }
            })
        }
        else if (remainingGuesses === 0) {
            console.log("Sorry, you lost. The correct word was " + currentWord);
        }
        else {
            console.log(
        }
    }
}

gamePlay();
