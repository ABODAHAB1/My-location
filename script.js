document.addEventListener("DOMContentLoaded", () => {
  // زر نبذة عن صانع الموقع
  const creatorBtn = document.getElementById('creator-btn');
  const info = document.getElementById('creator-info');
  if (creatorBtn) {
    creatorBtn.addEventListener('click', () => {
      info.classList.toggle('show');
    });
  }

  // الصوت عند الضغط
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
    const time = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const date = now.toLocaleDateString('ar-EG', { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' });
    document.getElementById("time").textContent = time;
    document.getElementById("date").textContent = date;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // النجوم
  for (let i = 0; i < 80; i++) {
    const star = document.createElement("div");
    star.className = "star";
    if (Math.random() < 0.5) star.classList.add("red
