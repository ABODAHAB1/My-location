/* ===== الساعة ===== */
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
    message = "🌞 صباح الخير";
  } else if (hour < 18) {
    message = "🌇 مساء الخير";
  } else {
    message = "🌙 مساء النور";
  }
  document.getElementById("welcome").textContent = message;
}
welcomeMessage();

/* ===== عداد الزيارات (موحد) ===== */
function visitCounter() {
  const key = "visits";
  const prev = parseInt(localStorage.getItem(key) || "0", 10);
  const visits = prev + 1;
  localStorage.setItem(key, String(visits));

  // تحديث العداد الأساسي
  document.getElementById("visits").textContent =
    "عدد زيارات الموقع حتى الآن: " + visits;

  // تحديث الرسالة المؤقتة بنفس القيمة
  showTimeMessage(visits);
}
visitCounter();

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

document.getElementById("toggle-prayer").addEventListener("click", () => {
  const widget = document.getElementById("prayer-widget");
  widget.style.display = widget.style.display === "none" ? "block" : "none";
});

/* ===== رسالة مؤقتة حسب الوقت + دمج العداد ===== */
function showTimeMessage(visits) {
  const nowInCairo = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" })
  );
  const hour = nowInCairo.getHours();
  let message = "";

  if (hour >= 0 && hour < 6) {
    message = `مساء الخير يا غالي، دخلت في موعد نومي 😂 - عدد زيارات الموقع: ${visits}`;
  } else if (hour >= 6 && hour < 12) {
    message = `صباح الخير يا غالي، لسه صاحي ومش فقيلك 🤣 - عدد زيارات الموقع: ${visits}`;
  } else {
    message = `أهلاً بيك يا غالي ✨ - : ${visits}`;
  }

  const popup = document.getElementById("time-popup");
  popup.textContent = message;
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

