function createModalWithScreenshot(screenshotData) {
  const modalContainer = document.createElement("div");
  modalContainer.innerHTML = `
    <div id="modal-overlay">
      <div id="modal-content">
        <button id="close-btn">&times;</button>
        <div id="modal-text">This is a modal!</div>
        <img id="screenshot-image" src="${screenshotData}" alt="Screenshot">
      </div>
    </div>
  `;

  // Apply styles using CSS
  const styles = `
    #modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    #modal-content {
      background-color: white;
      padding: 20px;
      border: 1px solid #ccc;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 70vw;
      max-height: 70vh;
      overflow: auto;
    }

    #close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 5px;
      cursor: pointer;
    }

    #modal-text {
      margin-bottom: 10px;
    }

    #screenshot-image {
      max-width: 100%;
      height: auto;
    }
  `;
  const styleElement = document.createElement("style");
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);

  // Close modal when close button is clicked
  const closeBtn = modalContainer.querySelector("#close-btn");
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(modalContainer);
  });

  // Append modal to the body
  document.body.appendChild(modalContainer);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showScreenshotModal") {
    createModalWithScreenshot(request.screenshotData);
  }
});

// Triggering screenshot capture
chrome.runtime.sendMessage({ action: "captureScreenshot" });
