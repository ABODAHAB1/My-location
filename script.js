document.addEventListener("DOMContentLoaded", () => {
  const arrow = document.querySelector('.scroll-down');
  const services = document.getElementById('services');
  const aboutSection = document.getElementById('about-section');
  const contactSection = document.getElementById('contact-section');

  arrow.addEventListener('click', () => {
    services.classList.add('show');
    aboutSection.classList.add('show');
    contactSection.classList.add('show');
    arrow.style.display = 'none';
    services.scrollIntoView({ behavior: 'smooth' });
  });

  const creatorBtn = document.getElementById('creator-btn');
  const info = document.getElementById('creator-info');
  creatorBtn.addEventListener('click', () => {
    info.classList.toggle('show');
  });

  const sound = document.getElementById('clickSound');
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => {
      if (sound) {
        sound.currentTime = 0;
        sound.play().catch(()=>{});
      }
    });
  });

  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('ar-EG');
    const date = now.toLocaleDateString('ar-EG', { weekday: 'short
