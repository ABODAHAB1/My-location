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
