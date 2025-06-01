let containerEl = document.getElementById("speedTypingTest");

let timerEl = document.getElementById("timer");
let randomTextEl = document.getElementById("quoteDisplay");
let resultEl = document.getElementById("result");

let userInputEl = document.getElementById("quoteInput");

let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");

let topContainerEl = document.getElementById("topContainer");
let bottomContainerEl = document.getElementById("bottomContainer");
let spinner = document.getElementById("spinner");

let randomQuote = "";
let uniqueId = null;

let timeCount = 1;
timerEl.textContent = timeCount;

function startTimer() {
    uniqueId = setInterval(function() {
        timerEl.textContent = timeCount;
        timeCount += 1;
    }, 1000);
}

function stopTimer() {
    clearInterval(uniqueId);
}

function getRandomQuote() {

    let url = "https://apis.ccbp.in/random-quote";
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            randomTextEl.textContent = jsonData.content;
            randomQuote = jsonData.content;

            spinner.classList.add("d-none");
            topContainerEl.classList.remove("d-none");
            bottomContainerEl.classList.remove("d-none");

        });
}

submitBtnEl.addEventListener("click", function() {
    if (userInputEl.value === randomQuote) {
        stopTimer();
        resultEl.textContent = "You typed in " + (timeCount - 1) + " seconds";
    } else {
        resultEl.textContent = "You typed incorrect sentence";
    }
});

resetBtnEl.addEventListener("click", function() {
    timeCount = 0;
    userInputEl.value = "";
    stopTimer();
    getRandomQuote();
    timerEl.textContent = 0;
    resultEl.textContent = "";
    startTimer();

    spinner.classList.remove("d-none");
    topContainerEl.classList.add("d-none");
    bottomContainerEl.classList.add("d-none");

});

startTimer();
getRandomQuote();