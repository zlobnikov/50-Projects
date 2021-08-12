const panels = document.querySelectorAll('.panel');

panels.forEach(panel => {
  panel.addEventListener('click', () => {
    removeActiveClass();
    panel.classList.add('active');
  });
});

function removeActiveClass() {
  const activePanel = document.querySelector('.active');
  activePanel.classList.remove('active');
}
