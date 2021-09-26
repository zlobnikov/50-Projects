const background = document.querySelector('.background');
const loading = document.querySelector('.loading');

const blur = 35;
const indent = 100;
const doubleIndent = 2 * 100;

let loaded = 0;
const process = setInterval(blurring, 50);

function blurring() {
  ++loaded;

  loading.innerText = `${loaded}%`;
  loading.style.opacity = 1 - loaded / 100;

  background.style.filter = `blur(${blur - loaded * blur / 100}px)`;
  background.style.left = `-${indent - loaded * indent / 100}px`;
  background.style.top = `-${indent - loaded * indent / 100}px`;
  background.style.width =
    `calc(100vw + ${doubleIndent - loaded * doubleIndent / 100}px)`;
  background.style.height =
    `calc(100vh + ${doubleIndent - loaded * doubleIndent / 100}px)`;

  if (loaded >= 100) clearInterval(process);
}