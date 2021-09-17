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

    const getBodyScrollTop = () => {
      return (
        self.pageYOffset ||
        (document.documentElement && document.documentElement.ScrollTop) ||
        (document.body && document.body.scrollTop)
      );
    };

    const openModal = () => {
      if (modal && overlay) {
        modal.classList.remove('modal--hidden');
        overlay.classList.remove('overlay--hidden');

        body.dataset.scrollY = getBodyScrollTop();

        body.classList.add('body-lock');
        body.style.top = '-' + body.dataset.scrollY + 'px';

        document.addEventListener('keydown', onEscPress);
        overlay.addEventListener('click', closeModal);
      }
    };

    const closeModal = () => {
      modal.classList.add('modal--hidden');
      overlay.classList.add('overlay--hidden');

      body.classList.remove('body-lock');
      window.scrollTo(0, +body.dataset.scrollY);

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
        manageModal(item, modalOpenButtons[index - 1]);
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
  const pageHeader = document.querySelector('.page-header');
  const pageHeaderTop = pageHeader.querySelector('.page-header__top');
  const navigationToggle = pageHeaderTop.querySelector('.page-header__navigation-toggle');
  const toggleBurgerIcon = navigationToggle.querySelector('.page-header__icon--burger');
  const toggleCloseIcon = navigationToggle.querySelector('.page-header__icon--close');
  const mainNavigation = pageHeader.querySelector('.page-header__main-navigation');
  const rightColumn = pageHeader.querySelector('.page-geader__right-column');

  pageHeader.classList.add('page-header--transparent');
  pageHeader.classList.add('page-header--fixed');
  pageHeaderTop.classList.remove('page-header__top--opened');
  navigationToggle.classList.remove('page-header__navigation-toggle--hidden');
  mainNavigation.classList.add('page-header__main-navigation--hidden');
  rightColumn.classList.add('page-geader__right-column--hidden');

  navigationToggle.addEventListener('click', function () {
    pageHeader.classList.toggle('page-header--transparent');
    pageHeader.classList.toggle('page-header--opened');
    pageHeaderTop.classList.toggle('page-header__top--opened');
    toggleBurgerIcon.classList.toggle('page-header__icon--hidden');
    toggleCloseIcon.classList.toggle('page-header__icon--hidden');
    mainNavigation.classList.toggle('page-header__main-navigation--hidden');
    rightColumn.classList.toggle('page-geader__right-column--hidden');
  });
})();
