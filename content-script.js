function createModal() {
  const modalContainer = document.createElement("div");
  modalContainer.style.position = "fixed";
  modalContainer.style.bottom = "0";
  modalContainer.style.right = "0";
  modalContainer.style.backgroundColor = "white";
  modalContainer.style.padding = "20px";
  modalContainer.style.margin = "20px";
  modalContainer.style.border = "1px solid #ccc";
  modalContainer.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  modalContainer.style.zIndex = "9999";
  modalContainer.style.display = "flex";
  modalContainer.style.alignItems = "center";
  modalContainer.style.gap = "10px";
  modalContainer.style.width = "300px";
  const modalContent = document.createElement("div");
  modalContent.textContent = "This is a modal! ";
  modalContainer.appendChild(modalContent);
  document.body.appendChild(modalContainer);
  setTimeout(() => {
    document.body.removeChild(modalContainer);
  }, 4000);
}
createModal();
