const timerElement = document.getElementById('timer');
const quoteElement = document.getElementById('quote');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

let countdown;
let timeLeft = 25 * 60;

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

function startTimer() {
  clearInterval(countdown);
  countdown = setInterval(() => {
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(countdown);
      timeLeft = 25 * 60;
      fetchQuote();
    }
    updateTimer();
  }, 1000);
  fetchQuote();
}

function pauseTimer() {
  clearInterval(countdown);
}

function resetTimer() {
  clearInterval(countdown);
  timeLeft = 25 * 60;
  updateTimer();
  fetchQuote();
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function fetchQuote() {
  fetch('/quote')
    .then(response => response.json())
    .then(data => {
      quoteElement.textContent = `"${data.content}" - ${data.author}`;
    })
    .catch(error => {
      console.error('Error:', error);
      quoteElement.textContent = 'Error fetching quote';
    });
}

// Fetch initial quote
fetchQuote();
