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
  
// Ви це мали на увазі? 

  formData = {
    email: "",
    message: "",
  };   
  
};


document.addEventListener('DOMContentLoaded', initFeedbackFormPage);
refs.feedbackForm.addEventListener('input', onFeedbackFormFieldChange);
refs.feedbackForm.addEventListener('submit', onFeedbackFormSubmit);

