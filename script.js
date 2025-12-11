document.addEventListener("DOMContentLoaded", () => {
  // زر نبذة عن صانع الموقع
  const creatorBtn = document.getElementById('creator-btn');
  const info = document.getElementById('creator-info');
  if (creatorBtn) {
    creatorBtn.addEventListener('click', () => {
      info.classList.toggle('show');
      // تغيير نص الزر حسب الحالة
      if (info.classList.contains('show')) {
        creatorBtn.textContent = "إخفاء النبذة";
      } else {
        creatorBtn.textContent = "💻 نبذة عن صانع الموقع";
      }
    });
  }

  // الصوت عند الضغط
  const sound = document.getElementById('clickSound');
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => {
      if (sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
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
    if (Math.random() < 0.5) {
      star.classList.add("red");
    } else {
      star.classList.add("blue");
    }
    star.style.top = Math.random() * window.innerHeight + "px";
    star.style.left = Math.random() * window.innerWidth + "px";
    document.body.appendChild(star);
  }

  // 🔢 عداد الزوار باستخدام Firebase Firestore
  const firebaseConfig = {
    apiKey: "AIzaSyDg3HhwgnQQn_JOjXCGyCQP8YHF5FN8bE0",
    authDomain: "abodahab-4d14e.firebaseapp.com",
    projectId: "abodahab-4d14e",
    storageBucket: "abodahab-4d14e.appspot.com",
    messagingSenderId: "442622031382",
    appId: "1:442622031382:web:38c1f156f43a683eb56737"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();
  const counterRef = db.collection("visits").doc("counter");

  async function updateCounterAndShow() {
    try {
      await counterRef.set(
        { count: firebase.firestore.FieldValue.increment(1) },
        { merge: true }
      );
      const snap = await counterRef.get();
      const data = snap.data() || { count: 1 };
      document.getElementById("visit-counter").innerText = data.count;
    } catch (e) {
      document.getElementById("visit-counter").innerText = "خطأ في العداد";
      console.error("Counter error:", e);
    }
  }

  updateCounterAndShow();
});
