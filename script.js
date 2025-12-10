// نزول سلس عند الضغط على السهم
const scrollBtn = document.querySelector('.scroll-down');
if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    // ينزل لتحت حيث تبدأ الخدمات
    const services = document.querySelector('.services');
    if (services) {
      services.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // بديل آمن لو القسم مش موجود
      window.scrollBy({ top: 500, behavior: 'smooth' });
    }
  });
}

// إظهار/إخفاء نبذة عن صانع الموقع
const creatorBtn = document.getElementById('creator-btn');
const creatorInfo = document.getElementById('creator-info');
if (creatorBtn && creatorInfo) {
  creatorBtn.addEventListener('click', () => {
    const isHidden = creatorInfo.hasAttribute('hidden');
    if (isHidden) {
      creatorInfo.removeAttribute('hidden');
    } else {
      creatorInfo.setAttribute('hidden', '');
    }
  });
}
