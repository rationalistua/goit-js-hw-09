import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startTimerBtn = document.querySelector('button[data-start]');
const datetimePickerInput = document.querySelector('#datetime-picker');
const timeDays = document.querySelector('span[data-days]');
const timeHours = document.querySelector('span[data-hours]');
const timeMinutes = document.querySelector('span[data-minutes]');
const timeSeconds = document.querySelector('span[data-seconds]');


startTimerBtn.addEventListener('click', onStartTimerBtnClick);

startTimerBtn.setAttribute('disabled', 'true');

let selectDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    selectDate = selectedDates[0].getTime()
    selectedDates[0] < options.defaultDate ? Notiflix.Notify.failure('Please choose a date in the future') : startTimerBtn.removeAttribute('disabled');
  }
};

const fp = flatpickr(datetimePickerInput, options);

const timer = {
        intervalId: null,
        isActive: false,
        start() {
            if (this.isActive) {
                return;
            }
            
            const startTime = selectDate;
            this.isActive = true;

            this.intervalId = setInterval(() => {
                const currentTime = Date.now();
                const deltaTime = startTime - currentTime;
                const time = convertMs(deltaTime);
                updateClockFace(time)
                if (deltaTime <= 1000) {
                    clearInterval(this.intervalId)
                }
            }, 1000);
        },
    }

function onStartTimerBtnClick() {
    timer.start()
}

function updateClockFace({ days, hours, minutes, seconds }) {
    timeDays.textContent = `${days}`;
    timeHours.textContent = `${hours}`;
    timeMinutes.textContent = `${minutes}`;
    timeSeconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
