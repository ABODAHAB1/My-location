document.addEventListener("DOMContentLoaded", () => {
  // زر نبذة عن صانع الموقع
  const creatorBtn = document.getElementById('creator-btn');
  const info = document.getElementById('creator-info');
  if (creatorBtn) {
    creatorBtn.addEventListener('click', () => {
      info.classList.toggle('show');
      creatorBtn.textContent = info.classList.contains('show')
        ? "إخفاء النبذة"
        : "💻 نبذة عن صانع الموقع";
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
    const time = now.toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    const date = now.toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
    document.getElementById("time").textContent = time;
    document.getElementById("date").textContent = date;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // النجوم المتحركة
  for (let i = 0; i < 80; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.top = Math.random() * window.innerHeight + "px";
    star.style.left = Math.random() * window.innerWidth + "px";
    document.body.appendChild(star);
  }

  // إعداد Firebase
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

  // عداد الزوار
  const counterRef = db.collection("visits").doc("counter");
  async function updateCounterAndShow() {
    try {
      await counterRef.set(
        { count: firebase.firestore.FieldValue.increment(1) },
        { merge: true }
      );
      const snap = await counterRef.get();
      const data = snap.data() || { count: 1 };
      document.getElementById("visit-counter").textContent = data.count;
    } catch (e) {
      document.getElementById("visit-counter").textContent = "خطأ في العداد";
      console.error("Counter error:", e);
    }
  }
  updateCounterAndShow();

  // =======================
  // كود دخول المشرف الجديد
  // =======================
  const adminBtn = document.querySelector(".admin-login-btn");
  const adminModal = document.getElementById("admin-modal");
  const adminSubmit = document.getElementById("admin-submit");
  const adminError = document.getElementById("admin-error");

  if (adminBtn && adminModal && adminSubmit) {
    // فتح المودال
    adminBtn.addEventListener("click", () => {
      adminModal.style.display = "flex";
    });

    // تأكيد كلمة السر
    adminSubmit.addEventListener("click", async () => {
      const inputPass = document.getElementById("admin-password").value.trim();
      try {
        const doc = await db.collection("admin").doc("login").get();

        if (doc.exists) {
          const savedPass = (doc.data().password || "").trim();

          // ✅ طباعة القيم في الـ Console
          console.log("كلمة السر المدخلة:", inputPass);
          console.log("كلمة السر المحفوظة في Firestore:", savedPass);

          // مقارنة دقيقة بعد إزالة المسافات الزائدة
          if (inputPass === savedPass) {
            alert("✅ تم تسجيل الدخول بنجاح");
            // إظهار خدمات تلجرام فقط
            document.querySelectorAll(".service").forEach(el => {
              if (!el.classList.contains("telegram")) {
                el.style.display = "none";
              }
            });
            adminModal.style.display = "none";
            adminError.style.display = "none";
          } else {
            adminError.style.display = "block";
          }
        } else {
          adminError.style.display = "block";
        }
      } catch (err) {
        console.error("Admin login error:", err);
        adminError.style.display = "block";
      }
    });
  }
});
