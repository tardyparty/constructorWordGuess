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
            // decrement amount of guess by 1
            remainingGuesses--;
        }
    }
}

module.exports = Letter;

var  x = new Letter(x);

console.log(x)