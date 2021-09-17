(function () {
  const orderForm = document.querySelector('.order-form');

  if (orderForm) {
    const dateChooserButton = orderForm.querySelector('#order-form-date-chooser-button');
    const timeRadioButtons = orderForm.querySelectorAll('.order-form__time-field input');
    const timePrices = orderForm.querySelectorAll('.order-form__time-field p');
    const orderFormSubmitContainer = orderForm.querySelector('.order-form__submit');
    const chosenTimeValue = orderFormSubmitContainer.querySelector('.order-form__time-value');
    const chosenPriceValue = orderFormSubmitContainer.querySelector('.order-form__price-value');

    if (orderFormSubmitContainer) {
      orderFormSubmitContainer.classList.add('order-form__submit--hidden');
    }

    orderForm.classList.add('order-form--js');

    const showSubmitInfoAndButton = (timeRadioButton, timePrice) => {
      if (chosenTimeValue) {
        chosenTimeValue.textContent = timeRadioButton.value;
      }

      if (chosenPriceValue) {
        chosenPriceValue.textContent = parseInt(timePrice.textContent);
      }

      if (orderFormSubmitContainer) {
        orderFormSubmitContainer.classList.remove('order-form__submit--hidden');
      }
    }

    const onDateChooserButton = (evt) => {
      evt.preventDefault();
      orderForm.classList.remove('order-form--js');

      if (timeRadioButtons) {
        for (let i = 0; i < timeRadioButtons.length; i++) {
          if (timeRadioButtons[i].checked) {
            showSubmitInfoAndButton(timeRadioButtons[i], timePrices[i]);
            break;
          }
        }
      }
    };

    if (dateChooserButton) {
      dateChooserButton.addEventListener('click', onDateChooserButton);
    }

    if (timeRadioButtons) {
      timeRadioButtons.forEach((item, index) => {
        item.addEventListener('change', () => {
          showSubmitInfoAndButton(item, timePrices[index]);
        })
      });
    }
  }
})();
