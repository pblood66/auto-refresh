let intervalId = null;
let currentSeconds = null;

browser.runtime.onMessage.addListener((message) => {
  if (message.command === "start") {
    if (intervalId) clearInterval(intervalId);
    currentSeconds = message.seconds;

    intervalId = setInterval(() => {
      browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) browser.tabs.reload(tabs[0].id);
      });
    }, message.seconds * 1000);

  } else if (message.command === "stop") {
    clearInterval(intervalId);
    intervalId = null;
    currentSeconds = null;

  } else if (message.command === "getState") {
    return Promise.resolve({ running: intervalId !== null, seconds: currentSeconds });
  }
});