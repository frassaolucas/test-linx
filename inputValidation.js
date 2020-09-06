function validateField(field) {
  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }

    return foundError;
  }

  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: "Por favor, preencha este campo",
      },
      email: {
        valueMissing: "E-mail é obrigatório",
        typeMismatch: "Por favor, preencha um e-mail válido",
      },
      number: {
        valueMissing: "Por favor, preencha este campo",
      },
    };

    return messages[field.type][typeError];
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector("span.error");

    if (message) {
      spanError.classList.add("active");
      spanError.innerHTML = message;
    } else {
      spanError.classList.remove("active");
      spanError.innerHTML = "";
    }
  }

  return function () {
    const error = verifyErrors();

    if (error) {
      const message = customMessage(error);

      field.style.borderColor = "red";
      setCustomMessage(message);
    } else {
      const colorGray = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--dark-gray");

      field.style.borderColor = colorGray;
      setCustomMessage();
    }
  };
}

// custom input validation
function customValidation(event) {
  const field = event.target;
  const validation = validateField(field);

  validation();
}

function handleInvalidInput() {
  const fields = document.querySelectorAll("[required]");

  for (let field of fields) {
    field.addEventListener("invalid", (event) => {
      event.preventDefault();

      customValidation(event);
    });
    field.addEventListener("blur", customValidation);
  }
}

export { handleInvalidInput };
