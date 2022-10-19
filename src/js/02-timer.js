import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/dark.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  inputArea: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysField: document.querySelector('span[data-days]'),
  hoursField: document.querySelector('span[data-hours]'),
  minutesField: document.querySelector('span[data-minutes]'),
  secondsField: document.querySelector('span[data-seconds]'),
};

refs.startBtn.disabled = true;
let isCorrectDate = false;
let difference = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    difference = selectedDates[0] - options.defaultDate;
    if (difference > 0) {
      refs.startBtn.disabled = false;
      isCorrectDate = true;
    } else {
      notifyFailure('Please choose a date in the future');
    }
  },
};

flatpickr(refs.inputArea, options);

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  console.log('Start timer');
  startTimer();
  refs.startBtn.disabled = true;
}

function notifyFailure(msg) {
  Notify.failure(msg, {
    position: 'center-center',
    timeout: 1000,
    pauseOnHover: false,
  });
}

function successMsg(msg) {
  Report.success('Success', msg, 'Okay');
}

function startTimer() {
  const intervalID = setInterval(() => {
    difference -= 1000;
    if (difference < 0) {
      stopTimer(intervalID);
      successMsg('Timer stopped successfully !!!))). Please reload the page.');
      return;
    }
    showTimer(convertMs(difference));
  }, 1000);
}

function stopTimer(id) {
  clearInterval(id);
  console.log('Stop timer');
}

function showTimer({ days, hours, minutes, seconds }) {
  refs.daysField.textContent = days;
  refs.hoursField.textContent = hours;
  refs.minutesField.textContent = minutes;
  refs.secondsField.textContent = seconds;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}