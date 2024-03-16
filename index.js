window.onload = function () {
  const modal = document.getElementById("modal-1");
  const openModal = document.querySelector(".open-modal-1");
  const closeModal = document.querySelector(".close-modal-1");

  const counter = modal.getElementsByClassName("counter");
  const minuses = modal.getElementsByClassName("minus");
  const plusses = modal.getElementsByClassName("plus");
  const amounts = modal.getElementsByClassName("amount");

  function minusClickHandler(i) {
    return function() {
      removeSauce(i, amounts, minuses, plusses);
    };
  }

  function plusClickHandler(i) {
    return function() {
      addSauce(i, amounts, minuses, plusses);
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

function removeSauce(number, amounts, minuses, plusses) {
  if (amounts[number].innerHTML == 1) {
    disableMinusBtn(minuses[number]);
  }
  if (getTotalSauceCount(amounts) == 10) {
    enablePlusBtns(plusses);
  }
  amounts[number].innerHTML = amounts[number].innerHTML - 1;
};

function addSauce(number, amounts, minuses, plusses) {
  if (amounts[number].innerHTML == 0) {
    activateMinusBtn(minuses[number]);
  }
  let totalAmount = getTotalSauceCount(amounts);
  if (totalAmount >= 9) {
    disablePlusBtns(plusses);
  }
  if (totalAmount <= 9) {
    amounts[number].innerHTML = +amounts[number].innerHTML + 1;
  }
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

function getTotalSauceCount(elements) {
  let totalSauceCount = 0;

  for (let element of elements) {
    console.log("element", element)
    console.log("element.innerHTML", element.innerHTML)
    totalSauceCount += +element.innerHTML;
  }

  return totalSauceCount;
};