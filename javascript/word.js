var Letter = require("./letter.js");

var Word = function(currentWord) {

    // array to store each letter object for word
    var letterArray = [];
    this.letterArray = letterArray;

    // builds letter object for every letter in word 
    // and pushes to letterArray
    var eachLetter = function() {
        for (letter in currentWord) {
            var newLetter = new Letter(currentWord[letter]);
            letterArray.push(newLetter);
        }
    }

    // calls eachletter to build letterarray 
    eachLetter();

    // calls each letter to build letterArray, 
    // puts each letters display value into new 
    // array and returns display array as string
    this.showWord = function() {
        displayArray = [];
        for (var i = 0; i < letterArray.length; i++) {
            displayArray.push(letterArray[i].display());
        }
        return displayArray.join('');
    }

    // takes in user guess and asks Letter if its true
    this.userGuess = function(x) {
        for (var i = 0; i < letterArray.length; i++) {
            letterArray[i].checkGuess(x); 

            if (letterArray[i].string === " ") {
                letterArray[i].isGuessed = true;
            }
        }
    }
}

module.exports = Word;