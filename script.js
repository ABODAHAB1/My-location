// الساعة الرقمية بتنسيق عربي وبتوقيت مصر
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

// رسالة ترحيب حسب توقيت مصر
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

// عداد الزيارات باستخدام localStorage
function visitCounter() {
  const key = "visits";
  const prev = parseInt(localStorage.getItem(key) || "0", 10);
  const visits = prev + 1;
  localStorage.setItem(key, String(visits));
  document.getElementById("visits").innerHTML =
    `<span class="label">عدد الزيارات:</span> <span class="value">${visits}</span>`;
}
visitCounter();
