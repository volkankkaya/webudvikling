const correctYear = 2012; // People thought the world was going to end in 2012
let guessCount = 0;
let lives = 5;
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

    guessCount++;

    if (guess === correctYear) {
        feedback.textContent = "✅ CORRECT!";
        feedback.style.color = "lime";
        wrongMsg.textContent = "";
        input.disabled = true;
        submitBtn.disabled = true;
    } else {
        let difference = Math.abs(correctYear - guess);

        if (difference <= 1) {
            feedback.textContent = "🔥 VERY HOT!";
            feedback.style.color = "red";
        } else if (difference <= 3) {
            feedback.textContent = "🔥 HOT!";
            feedback.style.color = "orangered";
        } else if (difference <= 6) {
            feedback.textContent = "WARM";
            feedback.style.color = "orange";
        } else if (difference <= 10) {
            feedback.textContent = "COLD";
            feedback.style.color = "#3399ff";
        } else if (difference <= 20) {
            feedback.textContent = "❄️ COLDER";
            feedback.style.color = "blue";
        } else {
            feedback.textContent = "🥶 VERY COLD!";
            feedback.style.color = "#66ccff";
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
