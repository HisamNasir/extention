chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "Click me",
    contexts: ["page"],
    id: "clickMeContextMenu",
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "clickMeContextMenu") {
    injectFileScript(tab.id);
  }
});

async function injectFileScript(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ["content-script.js"],
  });
}

let screenshotData = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "captureScreenshot") {
    chrome.tabs.captureVisibleTab({ format: "png" }, (dataUrl) => {
      screenshotData = dataUrl;
      chrome.tabs.sendMessage(sender.tab.id, {
        action: "showScreenshotModal",
        screenshotData: dataUrl,
      });
    });
  } else if (request.action === "replaceScreenshotData") {
    screenshotData = request.screenshotData;
  }
});
