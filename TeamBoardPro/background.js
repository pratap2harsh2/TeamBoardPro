chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ polls: [] }, () => {
      console.log("The polls storage is initialized.");
    });
  });
  