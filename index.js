window.onload = function () {
  const modal = document.getElementById("modal-1");
  const openModal = document.querySelector(".open-modal-1");
  const closeModal = document.querySelector(".close-modal-1");

  openModal.addEventListener("click", () => {
    modal.showModal();
  });

  closeModal.addEventListener("click", () => {
    modal.close();
  });

  

};

