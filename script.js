document.addEventListener("DOMContentLoaded", () => {
  const arrow = document.querySelector('.scroll-down');
  const services = document.getElementById('services');
  const aboutSection = document.getElementById('about-section');
  const contactSection = document.getElementById('contact-section');

  // عند الضغط على السهم
  arrow.addEventListener('click', () => {
    services.classList.add('show');
    aboutSection.classList.add('show');
    contactSection.classList.add('show');
    arrow.style.display = 'none';
    services.scrollIntoView({ behavior: 'smooth' });
  });

  // زر نبذة عن صانع الموقع
  const creatorBtn = document.getElementById('creator-btn');
  const info = document.getElementById('creator-info');
  creatorBtn.addEventListener('click', () => {
    info.classList.toggle('show');
  });

  // تشغيل الصوت عند الضغط
  const sound = document.getElementById('clickSound');
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => {
      if (sound) {
        sound.currentTime = 0;
        sound.play().catch(()=>{});
      }
    });
  });

  // الساعة والتاريخ
  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('ar-EG');
    const date = now.toLocaleDateString('ar-EG', { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' });
    document.getElementById("time").textContent = time;
    document.getElementById("date").textContent = date;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // النجوم
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.className = "star";
    if (Math.random() < 0.5) star.classList.add("red");
    star.style.top = (Math.random() * 100) + "vh";
    star.style.left = (Math.random() * 100) + "vw";
    const size = 4 + Math.random() * 6;
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.opacity = 0.3 + Math.random() * 0.8;
    document.body.appendChild(star);
  }
});
