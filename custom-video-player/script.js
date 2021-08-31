'use strict';

const player = document.querySelector('.player');
const video = document.querySelector('.video');

const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress-filled');

const toggle = document.querySelector('.toggle');
const ranges = document.querySelectorAll('.slider');
const rewindButtons = document.querySelectorAll('.rewind');


function togglePlay() {
  if (video.paused) video.play();
  else video.pause();
}

function updatePlayButton() {
  if (video.paused) toggle.innerHTML = '&#9658;';
  else toggle.innerHTML = '&vert;&nbsp;&vert;'
}

function updateProgress() {
  const currentWidth = video.currentTime / video.duration * 100;
  progressFilled.style.width = `${currentWidth}%`;
}

function shift(e) {
  const shiftTo = e.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = shiftTo;
}

function updateRange() {
  video[this.name] = this.value;
}

function rewind(value) {
  if (this && this.dataset) video.currentTime += +this.dataset.skip;
  else video.currentTime += value;
}

function handleKeys(e) {
  switch (e.code) {
    case 'Space':
    case 'KeyK':
      togglePlay();
      break;

    case 'KeyM':
      muteVolume();
      break;

    case 'ShiftRight':
    case 'ShiftLeft':
      isShiftPressed = true;
      break;

    case 'Period':
      if (isShiftPressed) {  // «>»
        if (ranges[1].value < 2) updatePlaybackRateByKey(0.1);
      } else if (video.paused) rewind(1/30);  // «.»

      break;

    case 'Comma':
      if (isShiftPressed) {  // «<»
        if (ranges[1].value > 0.5) updatePlaybackRateByKey(-0.1);
      } else if (video.paused) rewind(-1/30);  // «,»

      break;

    case 'KeyF':
      toggleFullScreen();
      break;

    case 'KeyJ':
      rewind(-10);
      break;

    case 'KeyL':
      rewind(10);
      break;

    case 'Digit0':
    case 'Digit1':
    case 'Digit2':
    case 'Digit3':
    case 'Digit4':
    case 'Digit5':
    case 'Digit6':
    case 'Digit7':
    case 'Digit8':
    case 'Digit9':
      moveTo(e.code[e.code.length - 1] / 10 * video.duration);
  }
}

function muteVolume() {
  if (video.volume === 0) video.volume = ranges[0].value;
  else video.volume = 0;
}

function unpressShift(e) {
  if (e.code === 'ShiftRight' || e.code === 'ShiftLeft') isShiftPressed = false;
}

function updatePlaybackRateByKey(value) {
  ranges[1].value = +ranges[1].value + value;
  video.playbackRate = ranges[1].value;
}

function toggleFullScreen() {
  if (!document.fullscreenElement) player.requestFullscreen();
  else if (document.exitFullscreen) document.exitFullscreen();
}

function moveTo(value) {
  video.currentTime = value;
}


video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', updateProgress);

let mousedown = false;
progress.addEventListener('click', shift);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && shift(e));

toggle.addEventListener('click', togglePlay);
ranges.forEach(range => range.addEventListener('change', updateRange));
ranges.forEach(range => range.addEventListener('mousemove', updateRange));
rewindButtons.forEach(button => button.addEventListener('click', rewind))

let isShiftPressed = false;
document.addEventListener('keydown', handleKeys);
document.addEventListener('keyup', unpressShift);

console.log(`Управление плеером с клавиатуры:

    1) клавиша Пробел — пауза;
    2) клавиша M (англ) — отключение/включение звука;
    3) клавиша > (SHIFT+.) — ускорение воспроизведения ролика;
    4) клавиша < (SHIFT+,) — замедление воспроизведения ролика;
    5) клавиша F — включение/выключение полноэкранного режим;
    1) клавиша K - приостановить или продолжить воспроизведение;
    2) клавиша J — перемотать ролик на 10 секунд назад;
    3) клавиша L — перемотать ролик на 10 секунд вперед;
    4) клавиша , (русская Б) — перейти к предыдущему кадру (когда воспроизведение приостановлено);
    5) клавиша . (русская Ю) — перейти к следующему кадру (когда воспроизведение приостановлено);
    6) клавиши 0..9 — перейти к определённому моменту видео (например, цифре «7» соответствует 70% длительности видео).
`);
