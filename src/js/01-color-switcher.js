const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

let timerId = null;
stopBtn.setAttribute('disabled', 'true');

function onStartBtnClick() {
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
        startBtn.setAttribute('disabled', 'true');
        stopBtn.removeAttribute('disabled');
    }, 1000);
}

function onStopBtnClick() {
    clearInterval(timerId);
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', 'true')
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
