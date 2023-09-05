let startTime;
let interval;
const lapTimes = [];

function startStopwatch() {
    if (!startTime) {
        startTime = Date.now();
        interval = setInterval(updateStopwatch, 10);
    }
}

function pauseStopwatch() {
    clearInterval(interval);
    startTime = null;
}

function resetStopwatch() {
    clearInterval(interval);
    startTime = null;
    document.getElementById('hr').textContent = '00';
    document.getElementById('min').textContent = '00';
    document.getElementById('sec').textContent = '00';
    document.getElementById('count').textContent = '00';
    lapTimes.length = 0;
    updateLapTimes();
}

function recordLapTime() {
    if (startTime) {
        const currentTime = Date.now();
        const elapsedTime = new Date(currentTime - startTime);
        lapTimes.push(formatTime(elapsedTime));
        updateLapTimes();
    }
}

function updateLapTimes() {
    const lapTimesList = document.getElementById('lapTimes');
    lapTimesList.innerHTML = '';
    lapTimes.forEach((lapTime, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Lap ${index + 1}: ${lapTime}`;
        lapTimesList.appendChild(listItem);
    });
}

function updateStopwatch() {
    const currentTime = Date.now();
    const elapsedTime = new Date(currentTime - startTime);
    const hours = elapsedTime.getUTCHours().toString().padStart(2, '0');
    const minutes = elapsedTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = elapsedTime.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = (elapsedTime.getUTCMilliseconds() / 10).toFixed(0).toString().padStart(2, '0');
    
    document.getElementById('hr').textContent = hours;
    document.getElementById('min').textContent = minutes;
    document.getElementById('sec').textContent = seconds;
    document.getElementById('count').textContent = milliseconds;
}

function formatTime(time) {
    const hours = time.getUTCHours().toString().padStart(2, '0');
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = (time.getUTCMilliseconds() / 10).toFixed(0).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// Event listeners for buttons
document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('stop').addEventListener('click', pauseStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('record').addEventListener('click', recordLapTime);
