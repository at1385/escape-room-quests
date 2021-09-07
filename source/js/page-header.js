(function () {
  const pageHeader = document.querySelector('.page-header');
  const navigationToggle = pageHeader.querySelector('.page-header__navigation-toggle');
  const toggleBurgerIcon = navigationToggle.querySelector('.page-header__icon--burger');
  const toggleCloseIcon = navigationToggle.querySelector('.page-header__icon--close');
  const mainNavigation = pageHeader.querySelector('.page-header__main-navigation');
  const rightColumn = pageHeader.querySelector('.page-geader__right-column');

  pageHeader.classList.add('page-header--transparent');
  pageHeader.classList.add('page-header--fixed');
  navigationToggle.classList.remove('page-header__navigation-toggle--hidden');
  mainNavigation.classList.add('page-header__main-navigation--hidden');
  rightColumn.classList.add('page-geader__right-column--hidden');

  navigationToggle.addEventListener('click', function () {
    pageHeader.classList.toggle('page-header--transparent');
    pageHeader.classList.toggle('page-header--opened');
    toggleBurgerIcon.classList.toggle('page-header__icon--hidden');
    toggleCloseIcon.classList.toggle('page-header__icon--hidden');
    mainNavigation.classList.toggle('page-header__main-navigation--hidden');
    rightColumn.classList.toggle('page-geader__right-column--hidden');
  });
})();
