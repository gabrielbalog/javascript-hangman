class Hangman {
    constructor(word, numberOfGuesses) {
        this.word = word.toLowerCase().split('')
        this.numberOfGuesses = numberOfGuesses
        this.guessedLetters = []
        this.status = 'playing'
    }
    get statusMessage() {
        if (this.status === 'playing') {
            return `Guesses left: ${this.numberOfGuesses}`
        } else if (this.status === 'failed') {
            return `Nice try! The word was "${this.word.join('')}".`
        } else {
            return 'Great work! You guessed the word.'
        }        
    }
    changeStatus() {
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')

        if (this.numberOfGuesses === 0) {
            this.status = 'failed'
        } else if (finished) {
            this.status = 'finished'
        } else {
            this.status = 'playing'
        }
    }
    get puzzle() {
        let puzzle = ''

        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                puzzle += letter
            } else {
                puzzle += '*'
            }
        })
    
        return puzzle
    }
    makeGuess(guess) {
        guess = guess.toLowerCase()
        const isUnique = !this.guessedLetters.includes(guess)
        const isBadGuess = !this.word.includes(guess)
    
        if (this.status === 'playing') {
            if (isUnique) {
                this.guessedLetters = [...this.guessedLetters, guess]
            }
        
            if (isUnique && isBadGuess) {
                this.numberOfGuesses--
            }
            this.changeStatus()
        }
    } 
}

export { Hangman as default }