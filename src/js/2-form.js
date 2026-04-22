const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
};

let formData = {
  email: "",
  message: "",
};

const initFeedbackFormPage = ()=> {
  try {
    const formDataFromLS = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );
    if (formDataFromLS === null) {
      return;
    } else {
    formData = formDataFromLS;
  }

    const formDataKeys = Object.keys(formDataFromLS);
    formDataKeys.forEach(key => {
      refs.feedbackForm.elements[key].value = formDataFromLS[key];
    });
  } catch (err) {
    console.log(err.message);
  }
};


const onFeedbackFormFieldChange = ({ target: formFieldElement }) => {
  const formFieldName = formFieldElement.name;
  const formFieldValue = formFieldElement.value.trim();
  formData[formFieldName] = formFieldValue;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();

  const formDataValues = Object.values(formData);
  if (formDataValues.includes('')) {
    alert(`Fill please all fields`);
    return;
  }
  console.log(formData);

  localStorage.removeItem('feedback-form-state');
  refs.feedbackForm.reset();
};


document.addEventListener('DOMContentLoaded', initFeedbackFormPage);
refs.feedbackForm.addEventListener('input', onFeedbackFormFieldChange);
refs.feedbackForm.addEventListener('submit', onFeedbackFormSubmit);
// Використовуй метод делегування для відстеження змін у формі через подію input. Зберігай актуальні дані з полів email та message у formData та записуй цей об’єкт у локальне сховище. Використовуй ключ "feedback-form-state" для зберігання даних у сховищі.
// При завантаженні сторінки перевір, чи є дані у локальному сховищі. Якщо так, використовуй їх для заповнення форми та об'єкта formData. Якщо ні, залиш поля форми порожніми.
// Перед відправленням форми переконайся, що обидва поля форми заповнені. Якщо будь-яке з полів (властивостей об’єкта formData) порожнє, показуй сповіщення з текстом «Fill please all fields». Якщо всі поля заповнені, виведи у консоль об’єкт formData з актуальними значеннями, очисти локальне сховище, об’єкт formData і поля форми.
