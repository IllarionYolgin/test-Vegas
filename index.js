window.onload = function () {
  const modal = document.getElementById("modal-1");

  const openModalBtn = document.querySelector(".modal-open-button-1");
  const closeModalBtn = document.querySelector(".modal-close-button-1");

  const counter = modal.getElementsByClassName("sauce-counter");
  const minuses = modal.getElementsByClassName("minus");
  const plusses = modal.getElementsByClassName("plus");
  const amounts = modal.getElementsByClassName("sauce-amount");

  function closeModal() {
    modal.close();
    removeEventListeners();
  }

  const closeModalHandler = closeModal;
  closeModalBtn.addEventListener("click", closeModalHandler);

  // Define the click handlers with closures
  function minusClickHandler(i) {
    return function () {
      removeSauce(i, amounts, minuses, plusses, modal);
    };
  }

  function plusClickHandler(i) {
    return function () {
      addSauce(i, amounts, minuses, plusses, modal);
    };
  }

  const minusHandlers = [];
  const plusHandlers = [];
  for (let i = 0; i < counter.length; i++) {
    minusHandlers[i] = minusClickHandler(i);
    plusHandlers[i] = plusClickHandler(i);
  }

  function addEventListeners() {
    closeModalBtn.addEventListener("click", closeModalHandler);
    for (let i = 0; i < counter.length; i++) {
      minuses[i].addEventListener("click", minusHandlers[i]);
      plusses[i].addEventListener("click", plusHandlers[i]);
    }
  }

  function removeEventListeners() {
    closeModalBtn.removeEventListener("click", closeModalHandler);
    for (let i = 0; i < counter.length; i++) {
      minuses[i].removeEventListener("click", minusHandlers[i]);
      plusses[i].removeEventListener("click", plusHandlers[i]);
    }
  }

  openModalBtn.addEventListener("click", () => {
    modal.showModal();
    addEventListeners();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      //if esc key was not pressed in combination with ctrl or alt or shift
      const isNotCombinedKey = !(
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      );
      if (isNotCombinedKey) {
        closeModal();
      }
    }
  });
};

function removeSauce(number, amounts, minuses, plusses, modal) {
  if (amounts[number].innerHTML == 1) {
    disableMinusBtn(minuses[number]);
  }
  if (getTotalSauceCount(modal) == 10) {
    enablePlusBtns(plusses);
  }
  if (amounts[number].innerHTML > 0) {
    amounts[number].innerHTML = amounts[number].innerHTML - 1;
  }
  updateOnSauceChange(modal);
};

function addSauce(number, amounts, minuses, plusses, modal) {
  if (amounts[number].innerHTML == 0) {
    activateMinusBtn(minuses[number]);
  }
  let totalAmount = getTotalSauceCount(modal);
  if (totalAmount >= 9) {
    disablePlusBtns(plusses);
  }
  if (totalAmount <= 9) {
    amounts[number].innerHTML = +amounts[number].innerHTML + 1;
  }
  updateOnSauceChange(modal);
};

function disableMinusBtn(element) {
  element.disabled = true;
}

function activateMinusBtn(element) {
  element.disabled = false;
};

function disablePlusBtns(btns) {
  Array.from(btns).forEach(element => {
    element.disabled = true;
  });
}

function enablePlusBtns(btns) {
  Array.from(btns).forEach(element => {
    element.disabled = false;
  });
}

function getTotalSauceCount(modal) {
  const amounts = Array.from(modal.getElementsByClassName("sauce-amount"));
  return amounts.reduce((total, element) => total + +element.textContent, 0);
};


function updateFreeSauceAmount(modal) {
  const saucePrice = 60;
  const maxFreeSauceAmountValue = +modal.querySelector(".max-free-sauce-amount").textContent;
  const selectedFreeSauceAmount = modal.querySelector(".selected-free-sauce-amount");
  const totalSauceCount = getTotalSauceCount(modal);
  const selectedFreeSauceAmountValue = Math.min(totalSauceCount, maxFreeSauceAmountValue);

  selectedFreeSauceAmount.textContent = selectedFreeSauceAmountValue;

  const saucePriceValue = modal.querySelectorAll(".sauce-price-value");
  const saucePriceToSet = (totalSauceCount < maxFreeSauceAmountValue) ? 0 : saucePrice;
  saucePriceValue.forEach(element => {
    element.textContent = saucePriceToSet;
  });
};

function updateOnSauceChange(modal) {
  updateFreeSauceAmount(modal);
  updateTotal(modal);
};

function updateTotal(modal) {
  const productPrice = 220;
  const saucePrice = 60;
  const selectedFreeSauceAmount = +modal.querySelector(".selected-free-sauce-amount").textContent;
  const total = modal.querySelector(".total-value");
  const totalSauceCount = getTotalSauceCount(modal);
  const totalValue = productPrice + ((totalSauceCount > 0) ? ((totalSauceCount - selectedFreeSauceAmount) * saucePrice) : 0);
  
  total.textContent = totalValue;
};