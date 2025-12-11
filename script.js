// إظهار الخدمات عند الضغط على السهم
document.addEventListener("DOMContentLoaded", () => {
  const arrow = document.querySelector('.scroll-down');
  const services = document.getElementById('services');

  arrow.addEventListener('click', () => {
    services.classList.add('show'); // يضيف الكلاس show علشان يظهر الخدمات
    arrow.style.display = 'none';   // يخفي السهم بعد الضغط
    services.scrollIntoView({ behavior: 'smooth' });
  });

  // زر نبذة عن صانع الموقع
  const creatorBtn = document.getElementById('creator-btn');
  const info = document.getElementById('creator-info');

  creatorBtn.addEventListener('click', () => {
    info.hidden = !info.hidden; // toggle إظهار/إخفاء النبذة
  });
});
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

  // زر نبذة عن صانع الموقع
  const creatorBtn = document.getElementById('creator-btn');
  const info = document.getElementById('creator-info');

  creatorBtn.addEventListener('click', () => {
    info.hidden = !info.hidden;
  });
});

