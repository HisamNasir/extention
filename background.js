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
