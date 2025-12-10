// يخلي السهم ينزل لتحت عند الضغط
document.querySelector('.scroll-down').addEventListener('click', () => {
  window.scrollBy({
    top: 400,
    behavior: 'smooth'
  });
});
