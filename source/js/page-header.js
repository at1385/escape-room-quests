(function () {
  const pageHeader = document.querySelector('.page-header');

  if (pageHeader) {
    const navigationToggle = pageHeader.querySelector('.page-header__navigation-toggle');

    pageHeader.classList.add('page-header--js');

    if (navigationToggle) {
      navigationToggle.addEventListener('click', function () {
        pageHeader.classList.toggle('page-header--opened');
        document.body.classList.toggle('body-lock');
      });
    }
  }
})();
