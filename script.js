// حركة السهم للنزول
document.querySelector('.scroll-down').addEventListener('click', () => {
  window.scrollBy({
    top: 500,
    behavior: 'smooth'
  });
});

// عرض نبذة عن صانع الموقع
function showCreatorInfo() {
  document.getElementById('creator-info').style.display = 'block';
}
