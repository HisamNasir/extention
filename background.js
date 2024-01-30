chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "Click me",
    contexts: ["page"],
    id: "clickMeContextMenu",
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "clickMeContextMenu") {
    // Trigger screenshot capture only when "Click Me" is clicked
    chrome.tabs.captureVisibleTab({ format: "png" }, (dataUrl) => {
      const screenshotData = dataUrl;
      // Send the screenshot data to the content script
      chrome.tabs.sendMessage(tab.id, {
        action: "showScreenshotModal",
        screenshotData: screenshotData,
      });
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "captureScreenshot") {
    chrome.tabs.captureVisibleTab({ format: "png" }, (dataUrl) => {
      chrome.tabs.sendMessage(sender.tab.id, {
        action: "showScreenshotModal",
        screenshotData: dataUrl,
      });
    });
  }
});
