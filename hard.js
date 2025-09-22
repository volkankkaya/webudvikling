const correctYear = 1991; // Cold War officially ended and Nevermind was released in 1991
let guessCount = 0;

const input = document.getElementById("guessInput");
const feedback = document.getElementById("feedback");
const wrongMsg = document.getElementById("wrongMsg");
const counter = document.getElementById("counter");
const submitBtn = document.getElementById("submitBtn");

// Submit when button clicked
submitBtn.addEventListener("click", submitGuess);

// Also submit when pressing Enter inside the input
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") submitGuess();
});

function submitGuess() {
    let guess = parseInt(input.value);
    guessCount++;

    if (isNaN(guess)) {
        feedback.textContent = "Please enter a valid year!";
        feedback.style.color = "yellow";
        // don't clear here — let the user correct their input
        return;
    }

    let difference = Math.abs(correctYear - guess);

    if (guess === correctYear) {
        feedback.textContent = "🎉 CORRECT!";
        feedback.style.color = "lime";
        wrongMsg.textContent = "";
        // You might want to keep the correct value visible, or disable input here.
    } else {
        // Hot/Cold levels
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




        wrongMsg.textContent = "Wrong";

        // --- THE CHANGE: clear the input and return focus so the user can type immediately ---
        input.value = "";
        input.focus();
        // -------------------------------------------------------------------------------
    }

    counter.textContent = "NUMBER OF GUESSES SO FAR: " + guessCount;
}

// optional: focus the input when page loads
input.focus();