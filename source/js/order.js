(function () {
  const orderForm = document.querySelector('#order-form');
  const dateChooserButton = orderForm.querySelector('#order-form-date-chooser-button');
  const dateChooserLabel = orderForm.querySelector('.order-form__date-chooser-label');

  if (dateChooserLabel) {
    dateChooserLabel.classList.add('order-form__date-chooser-label--hidden');
  }

  const onDateChooserButton = (evt) => {
    evt.preventDefault();
    dateChooserLabel.classList.toggle('order-form__date-chooser-label--hidden');
  };

  if (dateChooserButton) {
    dateChooserButton.addEventListener('click', onDateChooserButton);
  }
})();
