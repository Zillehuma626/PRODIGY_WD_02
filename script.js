let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];
let lapCounter = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetLapBtn = document.getElementById('resetLapBtn');
const lapsContainer = document.getElementById('laps');

const hourHand = document.getElementById('hour');
const minuteHand = document.getElementById('minute');
const secondHand = document.getElementById('second');

// Initially hide the laps container
lapsContainer.classList.add('hidden');

startStopBtn.addEventListener('click', startStop);
resetLapBtn.addEventListener('click', resetLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        startStopBtn.innerText = 'Stop';
        startStopBtn.classList.remove('start');
        startStopBtn.classList.add('stop');
        resetLapBtn.innerText = 'Lap';
        resetLapBtn.classList.remove('reset');
        resetLapBtn.classList.add('lap');
        resetLapBtn.disabled = false;
        running = true;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startStopBtn.innerText = 'Start';
        startStopBtn.classList.remove('stop');
        startStopBtn.classList.add('start');
        resetLapBtn.innerText = 'Reset';
        resetLapBtn.classList.remove('lap');
        resetLapBtn.classList.add('reset');
        running = false;
    }
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    display.innerText = formatTime(updatedTime);

    // Update analog clock hands
    const time = new Date(updatedTime);
    const milliseconds = time.getMilliseconds();
    const seconds = time.getUTCSeconds() + milliseconds / 1000;
    const minutes = time.getUTCMinutes() + seconds / 60;
    const hours = time.getUTCHours() + minutes / 60;

    secondHand.style.transform = `rotate(${seconds * 6}deg)`;
    minuteHand.style.transform = `rotate(${minutes * 6}deg)`;
    hourHand.style.transform = `rotate(${hours * 30}deg)`;
}

function resetLap() {
    if (!running) {
        clearInterval(tInterval);
        display.innerText = '00:00.00';
        startStopBtn.innerText = 'Start';
        startStopBtn.classList.remove('stop');
        startStopBtn.classList.add('start');
        resetLapBtn.innerText = 'Reset';
        resetLapBtn.classList.remove('lap');
        resetLapBtn.classList.add('reset');
        resetLapBtn.disabled = true;
        running = false;
        difference = 0;
        laps = [];
        lapCounter = 1;
        lapsContainer.innerHTML = '';
        lapsContainer.classList.add('hidden'); // Hide laps container when reset is clicked
        resetClockHands();
    } else {
        console.log('Lap Button Clicked'); // Debugging statement
        const lapTime = display.innerText;
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `<span>Lap ${lapCounter}</span><span>${lapTime}</span>`;
        lapsContainer.appendChild(lapItem);
        lapsContainer.classList.remove('hidden'); // Show laps when lap is added
        lapCounter++;
    }
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = ('0' + date.getUTCMinutes()).slice(-2);
    const seconds = ('0' + date.getUTCSeconds()).slice(-2);
    const milliseconds = ('00' + date.getUTCMilliseconds()).slice(-3, -1);
    return `${minutes}:${seconds}.${milliseconds}`;
}

function resetClockHands() {
    hourHand.style.transform = `rotate(90deg)`;
    minuteHand.style.transform = `rotate(90deg)`;
    secondHand.style.transform = `rotate(90deg)`;
}

function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.id === tabName) {
            tab.classList.add('active');
        }
    });
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.innerText.toLowerCase() === tabName.replace('-', ' ')) {
            button.classList.add('active');
        }
    });
}
