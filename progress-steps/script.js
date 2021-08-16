const progressBar = document.getElementById('progress-bar');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');


let activeCirclesCount = 1;

next.addEventListener('click', () => {
  activeCirclesCount++;

  if (activeCirclesCount > circles.length) {
    activeCirclesCount = circles.length;
  }

  update();
});

prev.addEventListener('click', () => {
  activeCirclesCount--;

  if (activeCirclesCount < 1) {
    activeCirclesCount = 1;
  }

  update();
});

function update() {
  updateCircles();
  updateProgressBar();
  updateButtons();
}

function updateCircles() {
  circles.forEach((circle, index) => {
    if (index < activeCirclesCount) circle.classList.add('active');
    else circle.classList.remove('active');
  });
}

function updateProgressBar() {
  progressBar.style.width =
    (activeCirclesCount - 1) / (circles.length - 1) * 100 + '%';
}

function updateButtons() {
  prev.disabled = activeCirclesCount === 1 ? true : false;
  next.disabled = activeCirclesCount === circles.length ? true : false;
}
