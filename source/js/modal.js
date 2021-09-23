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

        modal.setAttribute('tabindex', '0');
        modal.focus();

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

      modal.removeAttribute('tabindex');

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
