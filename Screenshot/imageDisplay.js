document.addEventListener("DOMContentLoaded", function () {
  let cropper;
  chrome.runtime.sendMessage({ action: "getScreenshotData" }, (response) => {
    const screenshotImage = document.getElementById("screenshot");
    if (response && response.screenshotData) {
      screenshotImage.src = response.screenshotData;
      cropper = new Cropper(screenshotImage, {
        aspectRatio: 16 / 10,
        movable: false,
      });
    } else {
      screenshotImage.alt = "Failed to load screenshot";
    }
  });
  document.getElementById("crop-btn").addEventListener("click", () => {
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      document.getElementById("screenshot").src = croppedCanvas.toDataURL();
    }
  });
  document.getElementById("download-btn").addEventListener("click", () => {
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      const link = document.createElement("a");
      link.href = croppedCanvas.toDataURL();
      link.download = "cropped_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  });
});
