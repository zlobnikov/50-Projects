'use strict';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
  'Saturday',];

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December',]

const cities = [
  {name: 'moscow', timezone: 3},
  {name: 'london', timezone: 1},
  {name: 'new-york', timezone: -4},
]

function main() {
  for (let city of cities) {
    const now = getDateProperties(city.timezone);
    const elements = getElements(city.name);

    setHands(now, elements);
    showTime(now, elements);
    showDate(now, elements);
  }
}

function getDateProperties(timezone) {
  const timeBias = timezone * 1000 * 60 * 60;
  const now = new Date(Date.now() + timeBias);

  return {
    seconds: now.getUTCSeconds(),
    minutes: now.getUTCMinutes(),
    hours: now.getUTCHours(),
    day: days[now.getUTCDay()],
    date: now.getUTCDate(),
    month: months[now.getUTCMonth()],
    year: now.getUTCFullYear(),
  }
}

function getElements(cityName) {
  return {
    secondHand: document.querySelector(`.${cityName} .second-hand`),
    minuteHand: document.querySelector(`.${cityName} .minute-hand`),
    hourHand: document.querySelector(`.${cityName} .hour-hand`),
    timeDay: document.querySelector(`.${cityName} .time-day`),
    date: document.querySelector(`.${cityName} .date`),
  }
}

function setHands(now, elements) {
  const secondHandRotation = now.seconds * 6 + 90;
  const minuteHandRotation = (now.minutes + now.seconds / 60) * 6 + 90;
  const hourHandRotation = (now.hours + now.minutes / 60) * 30 + 90;

  const constant = 'translateY(-50%) rotate(';
  elements.secondHand.style.transform =`${constant}${secondHandRotation}deg)`;
  elements.minuteHand.style.transform =`${constant}${minuteHandRotation}deg)`;
  elements.hourHand.style.transform =`${constant}${hourHandRotation}deg)`;
}

function showTime(now, elements) {
  const hours = ('0' + now.hours).slice(-2);
  const minutes = ('0' + now.minutes).slice(-2);
  const seconds = ('0' + now.seconds).slice(-2);
  elements.timeDay.innerHTML = `${hours}:${minutes}:${seconds}, ${now.day}`;
}

function showDate(now, elements) {
  elements.date.innerHTML = `${now.month} ${now.date}, ${now.year}`;
}


const switcher = document.querySelector('.switch');
switcher.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

setInterval(main, 1000);
