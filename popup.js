let intervalId = null;

document.getElementById("startBtn").addEventListener("click", () => {
  const seconds = parseInt(document.getElementById("interval").value);
  if (isNaN(seconds) || seconds < 1) return;

  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    browser.tabs.reload();
  }, seconds * 1000);

  document.getElementById("status").textContent = `Refreshing every ${seconds}s`;
});

document.getElementById("stopBtn").addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
  document.getElementById("status").textContent = "Stopped";
});