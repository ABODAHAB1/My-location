// تشغيل الساعة والتاريخ
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('ar-EG');
  const date = now.toLocaleDateString('ar-EG');
  document.getElementById('time').textContent = time;
  document.getElementById('date').textContent = date;
}
setInterval(updateClock, 1000);
updateClock();

// صوت عند الضغط على أي زر خدمة
document.querySelectorAll('.service').forEach(service => {
  service.addEventListener('click', () => {
    document.getElementById('clickSound').play();
  });
});

// زر النبذة
document.getElementById('creator-btn').addEventListener('click', () => {
  document.getElementById('creator-info').classList.toggle('show');
});

// عداد الزوار باستخدام Firebase
const firebaseConfig = {
  // بيانات مشروعك من Firebase Console
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const visitsRef = db.collection("visits").doc("counter");
visitsRef.get().then(doc => {
  if (doc.exists) {
    let count = doc.data().count || 0;
    count++;
    visitsRef.set({ count: count });
    document.getElementById("visit-counter").textContent = count;
  } else {
    visitsRef.set({ count: 1 });
    document.getElementById("visit-counter").textContent = 1;
  }
});

// =======================
// كود دخول المشرف الجديد
// =======================

// زر دخول المشرف
document.querySelector(".admin-login-btn").addEventListener("click", () => {
  document.getElementById("admin-modal").style.display = "flex";
});

// تأكيد كلمة السر
document.getElementById("admin-submit").addEventListener("click", async () => {
  const inputPass = document.getElementById("admin-password").value;
  const doc = await db.collection("admin").doc("login").get();
  if (doc.exists && inputPass === doc.data().password) {
    alert("✅ تم تسجيل الدخول بنجاح");
    // إظهار خدمات تلجرام فقط
    document.querySelectorAll(".service").forEach(el => {
      if (!el.classList.contains("telegram")) {
        el.style.display = "none";
      }
    });
    document.getElementById("admin-modal").style.display = "none";
  } else {
    document.getElementById("admin-error").style.display = "block";
  }
});
