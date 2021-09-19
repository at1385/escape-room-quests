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
    const userData = questionForm.querySelectorAll('.question-form--userdata');
    const userDataInputs = questionForm.querySelectorAll('.question-form--userdata input');
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

    userQuestion.addEventListener('keyup', () => {
      if (isStorageSupport) {
        localStorage.setItem('userQuestion', userQuestion.value);
      }
    });

    userConsent.addEventListener('change', () => {
      setSubmitCondition();
    });

    submit.addEventListener('click', () => {
      userData.forEach((item, index) => {
        if (!userDataInputs[index].validity.valid) {
          addClass('question-form__field--invalid', item);
        }

        if (!userDataInputs[index].validity.valid && item.classList.contains('question-form__field--user-email')) {
          userEmailError.classList.add('question-form__email-error--shown');
        }
      });
    })
  }
})();
