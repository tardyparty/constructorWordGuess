var Letter = require("./letter.js");

var Word = function(currentWord) {
    this.currentWord = currentWord;
    this.letterArray = [];
    this.eachLetter = function() {
        for (letter in currentWord) {
            var newLetter = new Letter(letter);
            letterArray.push(newLetter);
        }
    }
    this.showWord = function() {
        displayArray = [];
        for (var i = 0; i < letterArray.length; i++) {
            displayArray.push(letterArray[i].display());
        }
    }
    this.userGuess = function(x) {
        for (var i = 0; i < letterArray.length; i++) {
            letterArray[i].checkGuess(x);
        }
    }