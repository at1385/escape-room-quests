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
