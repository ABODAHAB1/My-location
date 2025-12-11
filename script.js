document.addEventListener("DOMContentLoaded", () => {
  const arrow = document.querySelector('.scroll-down');
  const services = document.getElementById('services');
  const aboutSection = document.getElementById('about-section');
  const contactSection = document.getElementById('contact-section');

  // عند الضغط على السهم
  arrow.addEventListener('click', () => {
    services.classList.add('show');       // يظهر الخدمات
    aboutSection.classList.add('show');   // يظهر زر النبذة
    contactSection.classList.add('show'); // يظهر زر الواتساب
    arrow.style.display = 'none';         // يخفي السهم
    services.scrollIntoView({ behavior: 'smooth' });
  });

  // زر نبذة عن صانع الموقع
  const creatorBtn = document.getElementById('creator-btn');
  const info = document.getElementById('creator-info');

  creatorBtn.addEventListener('click', () => {
    info.classList.toggle('show'); // يظهر/يخفي النبذة باستخدام كلاس show
  });
});
