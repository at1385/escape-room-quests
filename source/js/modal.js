(function () {
  const body = document.querySelector('body');
  const modalOpenButton = body.querySelector('.modal-open');
  const modal = body.querySelector('.modal');
  const modalScrollbar = modal.querySelector('.modal__wrapper');
  const modalCloseButton = modal.querySelector('.modal__close-button');
  const overlay = document.querySelector('.overlay');

  // скрытие/показ вертикального скроллбара для браузерного скроллбара по умолчанию
  const toggleDefaultScrollbar = (element, minHeight, styleClass) => {
    if (window.matchMedia(minHeight).matches) {
      element.classList.add(styleClass);
    } else {
      element.classList.remove(styleClass);
    }
  };

  window.addEventListener('resize', function () {
    toggleDefaultScrollbar(modalScrollbar, '(min-height: 485px)', 'modal__wrapper--hidden-scroll');
  });

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
})();
