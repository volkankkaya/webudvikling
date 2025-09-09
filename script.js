const startBtn = document.getElementById('startBtn');
const game = document.getElementById('game');
const guessBtn = document.getElementById('guessBtn');
const message = document.getElementById('message');
const guessInput = document.getElementById('guessInput');

let correctYear;

startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    game.style.display = 'block';
    correctYear = Math.floor(Math.random() * (2025 - 1900 + 1)) + 1900;
    console.log("Debug - Correct year:", correctYear); // fjern hvis du ikke vil snyde
});

guessBtn.addEventListener('click', () => {
    const guess = parseInt(guessInput.value);

    if (isNaN(guess)) {
        message.textContent = "Please enter a valid year!";
        return;
    }

    if (guess === correctYear) {
        message.textContent = "🎉 Correct! The year was " + correctYear;
    } else if (Math.abs(guess - correctYear) <= 5) {
        message.textContent = "🔥 Very close!";
    } else if (Math.abs(guess - correctYear) <= 20) {
        message.textContent = "WARM!";
    } else {
        message.textContent = "COLD!";
    }
});