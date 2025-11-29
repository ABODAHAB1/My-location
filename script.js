/* ===== الساعة الرقمية ===== */
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString("ar-EG", {
    timeZone: "Africa/Cairo",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true
  });
  document.getElementById("clock").textContent = time;
}
updateClock();
setInterval(updateClock, 1000);

/* ===== رسالة ترحيب حسب الوقت ===== */
function welcomeMessage() {
  const nowInCairo = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" })
  );
  const hour = nowInCairo.getHours();
  let message = "";
  if (hour < 12) {
    message = "🌞 صباح الخير يا زعيم";
  } else if (hour < 18) {
    message = "🌇 مساء الخير يا غالي";
  } else {
    message = "🌙 مساء النور ✨";
  }
  document.getElementById("welcome").textContent = message;
}
welcomeMessage();

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

/* ===== رسالة مؤقتة حسب الوقت ===== */
function showTimeMessage() {
  const nowInCairo = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" })
  );
  const hour = nowInCairo.getHours();
  let message = "";

  if (hour >= 0 && hour < 6) {
    message = "🌙 وقت النوم يا غالي 😂";
  } else if (hour >= 6 && hour < 12) {
    message = "🌞 صباح النشاط يا زعيم 🤩";
  } else if (hour >= 12 && hour < 18) {
    message = "🌇 مساء الخير – أهلاً بيك في عالم محمود ✨";
  } else {
    message = "🌌 سهرة سعيدة يا غالي 🌟";
  }

  const popup = document.getElementById("time-popup");
  popup.textContent = message;
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}
showTimeMessage();

/* ===== زر اضغط هنا يا غالي (إظهار/إخفاء النبذة) ===== */
function toggleAbout() {
  const about = document.getElementById("about-mahmoud");
  if (about.style.display === "none" || about.style.display === "") {
    about.style.display = "block";
    window.scrollTo({ top: about.offsetTop, behavior: "smooth" });
  } else {
    about.style.display = "none";
  }
}

// ربط الدالة بالزر
document.querySelector("button[onclick='showAbout()']").onclick = toggleAbout;

/* ===== زر الترحيب (يظهر 5 ثواني ويختفي) ===== */
window.onload = function() {
  const greetingBtn = document.getElementById("greeting-btn");
  if (greetingBtn) {
    greetingBtn.style.display = "block"; // يظهر أول ما يدخل الزائر
    setTimeout(() => {
      greetingBtn.style.display = "none"; // يختفي بعد 5 ثواني
    }, 5000);
  }
};
