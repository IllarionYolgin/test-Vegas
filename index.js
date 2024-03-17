window.onload = function () {
  const modal = document.getElementById("modal-1");
  const openModal = document.querySelector(".open-modal-1");
  const closeModal = document.querySelector(".close-modal-1");

  const counter = modal.getElementsByClassName("counter");
  const minuses = modal.getElementsByClassName("minus");
  const plusses = modal.getElementsByClassName("plus");
  const amounts = modal.getElementsByClassName("amount");

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

  function addEventListeners() {
    for (let i = 0; i < counter.length; i++) {
      minuses[i].addEventListener("click", minusClickHandler(i));
      plusses[i].addEventListener("click", plusClickHandler(i));
    }
  }

  function removeEventListeners() {
    for (let i = 0; i < counter.length; i++) {
      minuses[i].removeEventListener("click", minusClickHandler(i));
      plusses[i].removeEventListener("click", plusClickHandler(i));
    }
  }

  openModal.addEventListener("click", () => {
    modal.showModal();
    addEventListeners();
  });

  closeModal.addEventListener("click", () => {
    modal.close();
    removeEventListeners();//it looks like this is not working properly
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
  let totalSauceCount = 0;
  const amounts = modal.getElementsByClassName("amount");

  for (let element of Array.from(amounts)) {
    totalSauceCount += +element.innerHTML;
  }

  return totalSauceCount;
};

function updateFreeSauceAmount(modal){
  const maxFreeSauceAmountValue = +modal.getElementsByClassName("max-free-sauce-amount")[0].innerHTML;
  const selectedFreeSauceAmount = modal.getElementsByClassName("selected-free-sauce-amount")[0];
  const totalSauceCount = getTotalSauceCount(modal);
  const selectedFreeSauceAmountValue = (totalSauceCount < maxFreeSauceAmountValue) ? totalSauceCount : maxFreeSauceAmountValue;
console.log("selectedFreeSauceAmountValue", selectedFreeSauceAmountValue);
  selectedFreeSauceAmount.innerHTML = selectedFreeSauceAmountValue;
}

function updateOnSauceChange(modal) {
  const saucesPrices = modal.getElementsByClassName("saucePrice");
  const saucePriceValue = modal.getElementsByClassName("saucePriceValue");

  updateFreeSauceAmount(modal);
  updateTotal(modal);
}

function updateTotal(modal) {
  const productPrice = 220;
  const saucePrice = 60;

  const selectedFreeSauceAmount = +modal.getElementsByClassName("selected-free-sauce-amount")[0].innerHTML;

  const total = modal.getElementsByClassName("total")[0];
  const totalValue = total.getElementsByClassName("value")[0];

  const totalSauceCount = getTotalSauceCount(modal);

  totalValue.innerHTML = productPrice + ((totalSauceCount > 0) ? ((totalSauceCount - selectedFreeSauceAmount) * saucePrice) : 0);
}