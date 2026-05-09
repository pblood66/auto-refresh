browser.runtime.sendMessage({ command: "getState" }).then((state) => {
  if (state.running) {
    document.getElementById("interval").value = state.seconds;
    document.getElementById("status").textContent = `Refreshing every ${state.seconds}s`;
  } else {
    document.getElementById("status").textContent = "Stopped";
  }
});

document.getElementById("startBtn").addEventListener("click", () => {
  const seconds = parseInt(document.getElementById("interval").value);
  if (isNaN(seconds) || seconds < 1) return;

  browser.runtime.sendMessage({ command: "start", seconds });
  document.getElementById("status").textContent = `Refreshing every ${seconds}s`;
});

document.getElementById("stopBtn").addEventListener("click", () => {
  browser.runtime.sendMessage({ command: "stop" });
  document.getElementById("status").textContent = "Stopped";
});