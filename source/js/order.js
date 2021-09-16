(function () {
  const orderForm = document.querySelector('.order-form');
  const dateChooserButton = orderForm.querySelector('#order-form-date-chooser-button');

  if (orderForm) {
    orderForm.classList.add('order-form--js')
  }

  const onDateChooserButton = (evt) => {
    evt.preventDefault();
    orderForm.classList.remove('order-form--js');
  };

  if (dateChooserButton) {
    dateChooserButton.addEventListener('click', onDateChooserButton);
  }
})();
