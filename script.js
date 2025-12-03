// إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDg3HhWgnQQn_JOjXCGyCQP8YHF5FN8bE0",
  authDomain: "abodahab-4d14e.firebaseapp.com",
  projectId: "abodahab-4d14e",
  storageBucket: "abodahab-4d14e.appspot.com",
  messagingSenderId: "442622031382",
  appId: "1:442622031382:web:d9cb041dd3bbdf19b56737"
};

// تهيئة Firebase مرة واحدة فقط
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

/* ===== الساعة والتاريخ ===== */
function updateClockArabic() {
  const now = new Date();

  const time = now.toLocaleTimeString("ar-EG", {
    timeZone: "Africa/Cairo",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true
  });

  const date = now.toLocaleDateString("ar-EG", {
    timeZone: "Africa/Cairo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const weekday = now.toLocaleDateString("ar-EG", {
    timeZone: "Africa/Cairo",
    weekday: "long"
  });

  document.getElementById("clock").textContent = time;
  document.getElementById("date").textContent = date;
  document.getElementById("weekday").textContent = weekday;
}

updateClockArabic();
setInterval(updateClockArabic, 1000);

/* ===== مواقيت الصلاة ===== */
function loadPrayerTimes() {
  fetch("https://api.aladhan.com/v1/timingsByCity?city=Sohag&country=Egypt&method=5")
    .then(res => res.json())
    .then(data => {
      const timings = data.data.timings;
      const list = document.getElementById("prayer-list");
      const names = {
        "Fajr": "الفجر 🌅",
        "Dhuhr": "الظهر ☀️",
        "Asr": "العصر 🌤️",
        "Maghrib": "المغرب 🌇",
        "Isha": "العشاء 🌙"
      };
      list.innerHTML = "";
      for (let [name, time] of Object.entries(timings)) {
        if (names[name]) {
          const li = document.createElement("li");
          li.textContent = `${names[name]} : ${time}`;
          list.appendChild(li);
        }
      }
    });
}
loadPrayerTimes();

/* زر إظهار/إخفاء مواقيت الصلاة */
document.getElementById("toggle-prayer").addEventListener("click", () => {
  const widget = document.getElementById("prayer-widget");
  widget.style.display = widget.style.display === "none" ? "block" : "none";
});

/* ===== رسالة مؤقتة فوق الساعة ===== */
function showGreetingMessage() {
  const nowInCairo = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" })
  );
  const hour = nowInCairo.getHours();
  let message = "";

  if (hour >= 5 && hour < 12) {
    message = "🌞 صباح الخير يا زعيم";
  } else if (hour >= 12 && hour < 18) {
    message = "🌇 مساء الخير يا غالي";
  } else {
    message = "🌙 سهرة سعيدة يا زعيم";
  }

  const popup = document.getElementById("greeting-message");
  popup.textContent = message;
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 5000);
}

window.onload = function () {
  showGreetingMessage();
};

/* ===== زر التقييم ===== */
document.getElementById("feedbackBtn").onclick = function () {
  document.getElementById("feedbackForm").style.display = "block";
};

/* ===== التعليقات مع Firebase ===== */
const commentsRef = db.collection("comments");

// إرسال التعليق وتخزينه
async function submitComment() {
  let comment = document.getElementById("userComment").value;
  if (comment.trim() !== "") {
    try {
      await commentsRef.add({
        text: comment,
        time: firebase.firestore.FieldValue.serverTimestamp()
      });
      alert("شكراً على رأيك!");
      document.getElementById("userComment").value = "";
      document.getElementById("feedbackForm").style.display = "none";
      loadComments();
    } catch (error) {
      console.error("خطأ أثناء إرسال التعليق:", error);
      alert("فيه مشكلة في الاتصال بقاعدة البيانات");
    }
  } else {
    alert("من فضلك اكتب تعليق قبل الإرسال");
  }
}

// تحميل التعليقات وعرضها
async function loadComments() {
  const snapshot = await commentsRef.orderBy("time", "desc").limit(10).get();
  const list = document.getElementById("comments");
  list.innerHTML = "";
  snapshot.forEach(doc => {
    const li = document.createElement("li");
    li.textContent = doc.data().text;
    list.appendChild(li);
  });
}

// تشغيل التحميل عند البداية
loadComments();
