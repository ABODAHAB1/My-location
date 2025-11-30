/* ===== الساعة والتاريخ ===== */
function updateClockArabic() {
  const now = new Date();

  // الوقت بالأرقام العربية مع ص/م
  const time = now.toLocaleTimeString("ar-EG", {
    timeZone: "Africa/Cairo",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true
  });

  // التاريخ: يوم/شهر/سنة
  const date = now.toLocaleDateString("ar-EG", {
    timeZone: "Africa/Cairo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  // اليوم بالعربي
  const weekday = now.toLocaleDateString("ar-EG", {
    timeZone: "Africa/Cairo",
    weekday: "long"
  });

  // عرض القيم في العناصر
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

/* ===== تشغيل الرسالة المؤقتة عند تحميل الصفحة ===== */
window.onload = function() {
  showGreetingMessage();
};
/* ===== التعليقات الجانبية ===== */
let comments = [];
let currentIndex = 0;

// جلب التعليقات من Firebase (collection اسمها comments)
db.collection("comments").onSnapshot(snapshot => {
  comments = snapshot.docs.map(doc => doc.data().text);
});

// عرض أول 5 تعليقات وتدويرها كل 10 ثواني
function showComments() {
  const sidebar = document.getElementById("comments-sidebar");
  sidebar.innerHTML = "";

  const slice = comments.slice(currentIndex, currentIndex + 5);
  slice.forEach(c => {
    const div = document.createElement("div");
    div.className = "comment";
    div.textContent = c;
    sidebar.appendChild(div);
  });

  currentIndex += 5;
  if (currentIndex >= comments.length) currentIndex = 0;
}

setInterval(showComments, 10000);

