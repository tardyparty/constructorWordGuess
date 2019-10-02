var Letter = function(x) {
 this.string = x;
 this.isGuessed = false;
 this.display = function() {
    if (this.isGuessed) {
        // display letter as string 
        return this.string
    }
    else {
        // not guess so display letter as '_'
        return "_"
        }
    }
    this.checkGuess = function(x) {
        if (this.string === x) {
            this.isGuessed = true;
        }
        else {
            // decrement amount of guesses by 1
            remainingGuesses--;
        }
    }
}

module.exports = Letter;
