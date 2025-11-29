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

/* ===== رسالة مؤقتة فوق الساعة ===== */
window.onload = function() {
  const greeting = document
