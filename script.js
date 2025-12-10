// إظهار الخدمات عند الضغط على السهم
document.querySelector('.scroll-down').addEventListener('click', () => {
  const services = document.getElementById('services');
  if (services.hasAttribute('hidden')) {
    services.removeAttribute('hidden');
    services.scrollIntoView({ behavior: 'smooth' });
  }
});

// زر نبذة عن صانع الموقع
document.getElementById('creator-btn').addEventListener('click', () => {
  const info = document.getElementById('creator-info');
  if (info.hasAttribute('hidden')) {
    info.removeAttribute('hidden');
  } else {
    info.setAttribute('hidden', '');
  }
});
