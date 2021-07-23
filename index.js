let currentInput;
let listInput = document.querySelectorAll(".input-txt");

// Add event listeners to all input type="text"
// So when a key is detected in the individual inputs, the error goes away
for (let i = 0; i < listInput.length; i++) {
  currentInput = listInput[i];
  currentInput.addEventListener("keydown", function (event) {
    if (this.classList.contains("error")) {
      let errorIcon = this.nextElementSibling;
      let errorMsg = errorIcon.nextElementSibling;
      this.classList.remove("error");
      errorIcon.style.visibility = "hidden";
      errorMsg.style.maxHeight = null;
    }
  });
}

// Runs when submit event is triggered
// Validates the form and notify if there are any errors
const validateForm = () => {
  let isValid = true;

  //Iterate through all input text fields
  for (let i = 0; i < listInput.length; i++) {
    currentInput = listInput[i];

    // Check if current input field is empty
    if (currentInput.value.trim() === "") {
      triggerError(currentInput);
      isValid = false;
      currentInput.placeholder = "";
    }

    // Check if email is in a valid format
    if (currentInput.id === "email") {
      emailValid = validateEmail(currentInput);
      if (!emailValid) {
        triggerError(currentInput);
        isValid = false;
      }
    }
  }

  if (isValid && emailValid) {
    return true;
  } else {
    return false;
  }
};

// If email isn't in valid format, change placeholder to showcase error
const validateEmail = (email) => {
  let strEmail = email.value.trim();
  if (strEmail.indexOf("@") === -1 || strEmail.indexOf(".") === -1) {
    email.placeholder = "email@example/com";
    email.classList.add("error-email");
    return false;
  }
  return true;
};

// If called, trigger error classes
const triggerError = (currentInput) => {
  let errorIcon = currentInput.nextElementSibling;
  let errorMsg = errorIcon.nextElementSibling;
  currentInput.classList.add("error");
  errorIcon.style.visibility = "visible";
  errorMsg.style.maxHeight = errorMsg.scrollHeight + "px";
};
