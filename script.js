let startTime,
  updatedTime,
  difference = 0;

let timerInterval;
let isRunning = false;
let lapCounter = 1;

const needle = document.getElementById("needle");
const statusDisplay = document.getElementById("statusDisplay");

function updateDisplay() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let milliseconds = parseInt((difference % 1000) / 10);
  let seconds = parseInt((difference / 1000) % 60);
  let minutes = parseInt((difference / (1000 * 60)) % 60);

  document.getElementById("timeDisplay").textContent =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}.` +
    `${String(milliseconds).padStart(2, "0")}`;

  let rotation = ((difference % 60000) / 60000) * 360;
  needle.style.transform = `rotate(${rotation}deg)`;
}

function startStopwatch() {
  if (!isRunning) {
    startTime = new Date().getTime() - difference;
    timerInterval = setInterval(updateDisplay, 10);
    isRunning = true;
    statusDisplay.textContent = "Running...";
  }
}

function stopStopwatch() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
    statusDisplay.textContent = "Stopped";
  }
}

function resetStopwatch() {
  clearInterval(timerInterval);
  difference = 0;
  isRunning = false;

  document.getElementById("timeDisplay").textContent = "00:00.00";
  needle.style.transform = "rotate(0deg)";
  document.getElementById("laps").innerHTML = "";
  lapCounter = 1;

  statusDisplay.textContent = "Ready";
}

function recordLap() {
  if (!isRunning) return;

  const lapTime = document.getElementById("timeDisplay").textContent;

  const lap = document.createElement("div");
  lap.className = "lap-item";
  lap.innerHTML = `<span>Lap ${lapCounter++}</span><span>${lapTime}</span>`;

  document.getElementById("laps").prepend(lap);
}
