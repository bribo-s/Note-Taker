// Initialize the notes storage if it doesn't exist
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(['notes'], (result) => {
      if (!result.notes) {
        chrome.storage.local.set({ notes: [] }, () => {
          console.log('Notes storage initialized.');
        });
      }
    });
  });
  