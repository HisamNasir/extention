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
  modalContent.textContent = "This is a modal!";
  const iconWrapper = document.createElement("div");
  iconWrapper.className = "rotate-icon";
  iconWrapper.style.width = "20px";
  iconWrapper.style.height = "20px";
  iconWrapper.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z"/>
    </svg>
  `;
  modalContent.appendChild(iconWrapper);
  modalContainer.appendChild(modalContent);
  document.body.appendChild(modalContainer);
  setTimeout(() => {
    document.body.removeChild(modalContainer);
  }, 4000);
}
createModal();
