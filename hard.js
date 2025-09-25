const correctYear = 1991; // Cold War officially ended and Nevermind was released in 1991
let guessCount = 0;
let lives = 3;
let guessHistory = []; // gemmer alle tidligere gæt

const input = document.getElementById("guessInput");
const feedback = document.getElementById("feedback");
const wrongMsg = document.getElementById("wrongMsg");
const counter = document.getElementById("counter");
const submitBtn = document.getElementById("submitBtn");
const livesDisplay = document.getElementById("lives");
const historyDisplay = document.getElementById("history"); // nyt element i HTML

submitBtn.addEventListener("click", submitGuess);

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") submitGuess();
});

function updateLives() {
    livesDisplay.textContent = "❤️".repeat(lives);
}

function updateHistory() {
    historyDisplay.textContent = "Your guesses: " + guessHistory.join(", ");
}

function submitGuess() {
    if (lives <= 0) return; // No more guesses allowed

    let guess = parseInt(input.value);
    guessCount++;

    if (isNaN(guess)) {
        feedback.textContent = "Please enter a valid year!";
        feedback.style.color = "yellow";
        return;
    }

    // Tjek om tallet allerede er gættet
    if (guessHistory.includes(guess)) {
        feedback.textContent = "⚠️ YOU ALREADY GUESSED " + guess;
        feedback.style.color = "yellow";
        input.value = "";
        input.focus();
        return;
    }

    // Tilføj gættet til historikken
    guessHistory.push(guess);
    updateHistory();

    if (guess === correctYear) {
        feedback.textContent = "✅ CORRECT!";
        feedback.style.color = "lime";
        wrongMsg.textContent = "";
        input.disabled = true;
        submitBtn.disabled = true;
    } else {
        if (guess < correctYear) {
            feedback.textContent = "⬆️ HIGHER";
            feedback.style.color = "orange";
        } else {
            feedback.textContent = "⬇️ LOWER";
            feedback.style.color = "blue";
        }

        wrongMsg.textContent = "WRONG";
        input.value = "";
        input.focus();

        // Lose a life
        lives--;
        updateLives();

        if (lives === 0) {
            feedback.textContent = "💀 GAME OVER! THE YEAR WAS " + correctYear;
            feedback.style.color = "gray";
            input.disabled = true;
            submitBtn.disabled = true;
        }
    }

    counter.textContent = "NUMBER OF GUESSES SO FAR: " + guessCount;
}

updateLives();
input.focus();