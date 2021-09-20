'use strict';

(function () {
  document.body.classList.add('js');
})();

(function () {
  const body = document.querySelector('body');

  const modals = body.querySelectorAll('.modal');
  const modalOpenButtons = body.querySelectorAll('.modal-open');

  const manageModal = (modal, modalOpenButton) => {
    const modalScrollbar = modal.querySelector('.modal__wrapper');
    const modalCloseButton = modal.querySelector('.modal__close-button');
    const overlay = document.querySelector('.overlay');

    const toggleDefaultScrollbar = (element, minHeight, styleClass) => {
      if (window.matchMedia(minHeight).matches) {
        element.classList.add(styleClass);
      } else {
        element.classList.remove(styleClass);
      }
    };

    if (modalScrollbar) {
      window.addEventListener('resize', function () {
        toggleDefaultScrollbar(modalScrollbar, '(min-height: 685px)', 'modal__wrapper--hidden-scroll');
      });
    }

    const isEscKeydown = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

    const onEscPress = (evt) => {
      if (isEscKeydown(evt)) {
        closeModal();
      }
    };

    function existVerticalScroll() {
      return document.body.offsetHeight > window.innerHeight;
    }

    const openModal = () => {
      if (modal && overlay) {
        modal.classList.remove('modal--hidden');
        overlay.classList.remove('overlay--hidden');

        if (!existVerticalScroll()) {
          body.classList.add('body-lock');
        } else if (!body.classList.contains('body-lock')) {
          body.classList.add('body-lock--scroll');
        }

        document.addEventListener('keydown', onEscPress);
        overlay.addEventListener('click', closeModal);
      }
    };

    const closeModal = () => {
      modal.classList.add('modal--hidden');
      overlay.classList.add('overlay--hidden');

      if (!existVerticalScroll()) {
        body.classList.remove('body-lock');
      } else if (!body.classList.contains('body-lock')) {
        body.classList.remove('body-lock--scroll');
      }

      document.removeEventListener('keydown', onEscPress);
      overlay.removeEventListener('click', closeModal);
    };

    if (modalOpenButton) {
      modalOpenButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        openModal();
      });
    }

    if (modalCloseButton) {
      modalCloseButton.addEventListener('click', function () {
        closeModal();
      });
    }
  };

  if (modals[0].classList.contains('modal--page')) {
    modals.forEach((item, index) => {
      if (!item.classList.contains('modal--page')) {
        manageModal(item, modalOpenButtons[--index]);
      }
    });
  } else {
    modals.forEach((item, index) => {
      manageModal(item, modalOpenButtons[index]);
    });
  }
})();

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

(function () {
  const questionForm = document.querySelector('.question-form');
  const questionLink = document.querySelector('.question-link');

  const setFocus = (field) => {
    if (field) {
      field.focus();
    }
  }

  const addClass = (styleClass, targetElement) => {
    if (!targetElement.classList.contains(styleClass)) {
      targetElement.classList.add(styleClass);
    }
  }

  const removeClass = (styleClass, targetElement) => {
    if (targetElement.classList.contains(styleClass)) {
      targetElement.classList.remove(styleClass);
    }
  }

  if (questionForm) {
    const userData = questionForm.querySelectorAll('.question-form__field--userdata');
    const userDataInputs = questionForm.querySelectorAll('.question-form__field--userdata input');
    const userName = questionForm.querySelector('#question-form-username');
    const userEmail = questionForm.querySelector('#question-form-user-email');
    const userEmailError = questionForm.querySelector('.question-form__email-error');
    const userQuestion = questionForm.querySelector('#question-form-user-question');
    const userConsent = questionForm.querySelector('#question-form-personal-data-consent');
    const submit = questionForm.querySelector('.question-form__submit');

    if (submit) {
      submit.setAttribute('disabled', 'disabled');
    }

    setFocus(userName);

    if (questionLink) {
      questionLink.addEventListener('click', (evt) => {
        evt.preventDefault();
        setFocus(userName);
      });
    }

    let isStorageSupport = true;
    let nameStorage = '';
    let emailStorage = '';
    let questionStorage = '';

    try {
      nameStorage = localStorage.getItem('userName');
      emailStorage = localStorage.getItem('userEmail');
      questionStorage = localStorage.getItem('userQuestion');
    } catch (err) {
      isStorageSupport = false;
    }

    if (nameStorage && userName) {
      userName.value = nameStorage;
    }
    if (emailStorage && userEmail) {
      userEmail.value = emailStorage;
    }
    if (questionStorage && userQuestion) {
      userQuestion.value = questionStorage;
    }

    const setSubmitCondition = () => {
      if (userName.value !== '' && userEmail.value !== '' && userConsent.checked) {
        if (submit) {
          submit.removeAttribute('disabled');
        }
      } else {
        if (!submit.getAttribute('disabled')) {
          submit.setAttribute('disabled', 'disabled');
        }
      }
    }

    setSubmitCondition();

    if (userData) {
      userData.forEach((item, index) => {
        if (userDataInputs[index].value !== '' && userDataInputs[index].validity.valid) {
          addClass('question-form__field--valid', item);
        } else if (userDataInputs[index].value !== '' && !userDataInputs[index].validity.valid) {
          addClass('question-form__field--invalid', item);

          if (item.classList.contains('question-form__field--user-email')) {
            userEmailError.classList.add('question-form__email-error--shown');
          }
        }

        userDataInputs[index].addEventListener('keyup', () => {
          if (userDataInputs[index].value === '' && item.classList.contains('question-form__field--valid')) {
            removeClass('question-form__field--valid', item);
          } else {
            if (!item.classList.contains('question-form__field--user-email') && item.classList.contains('question-form__field--invalid')) {
              removeClass('question-form__field--invalid', item);
            }

            if (item.classList.contains('question-form__field--user-email')) {
              if (userDataInputs[index].validity.valid && userEmailError.classList.contains('question-form__email-error--shown')) {
                userEmailError.classList.remove('question-form__email-error--shown');
                removeClass('question-form__field--invalid', item);
              }

              if (!userDataInputs[index].validity.valid && userDataInputs[index].value !== '') {
                removeClass('question-form__field--invalid', item);
                userEmailError.classList.remove('question-form__email-error--shown');
              }
            }

            addClass('question-form__field--valid', item);
          }

          if (isStorageSupport) {
            localStorage.setItem('userName', userName.value);
            localStorage.setItem('userEmail', userEmail.value);
          }

          setSubmitCondition();
        });
      });
    }

    if (userQuestion) {
      userQuestion.addEventListener('keyup', () => {
        if (isStorageSupport) {
          localStorage.setItem('userQuestion', userQuestion.value);
        }
      });
    }

    if (userConsent) {
      userConsent.addEventListener('change', () => {
        setSubmitCondition();
      });
    }

    if (submit) {
      submit.addEventListener('click', () => {
        if (userData) {
          userData.forEach((item, index) => {
            if (!userDataInputs[index].validity.valid) {
              addClass('question-form__field--invalid', item);
            }

            if (!userDataInputs[index].validity.valid && item.classList.contains('question-form__field--user-email')) {
              userEmailError.classList.add('question-form__email-error--shown');
            }
          });
        }
      });
    }
  }
})();

(function () {
  const pageHeader = document.querySelector('.page-header');
  const pageFooter = document.querySelector('.page-footer');

  if (pageHeader) {
    const navigationToggle = pageHeader.querySelector('.page-header__navigation-toggle');

    pageHeader.classList.add('page-header--js');

    if (navigationToggle) {
      navigationToggle.addEventListener('click', function () {
        pageHeader.classList.toggle('page-header--opened');
        document.body.classList.toggle('body-lock');

        if (pageFooter) {
          pageFooter.classList.toggle('page-footer--shown');
        }
      });
    }
  }
})();
