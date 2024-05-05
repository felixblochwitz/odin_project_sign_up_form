const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// detect fields in html
const form = document.querySelector("form");
const firstName = document.getElementById("firstName");
firstName.valid = false;

const lastName = document.getElementById("lastName");
lastName.valid = false;

const email = document.getElementById("email");
email.valid = false;
const emailError = document.getElementById("email-error-msg");

const phoneNumber = document.getElementById("phoneNumber");
phoneNumber.valid = false;

const password = document.getElementById("password");
password.valid = false;
const pwConfirm = document.getElementById("pwConfirm");
const pwError = document.getElementById("pw-error-msg");

const submitBtn = document.getElementById("submit-btn");

const terms = document.getElementById("terms");

const warnIcon = document.createElement("i");
warnIcon.className = "bx bx-error";
const checkIcon = document.createElement("i");
checkIcon.className = "bx bx-check";

const validInputColor = "#34eb7a";
const invalidInputColor = "#f2594e";

// simple event listeners for first and last name validation
firstName.addEventListener("input", () => {
  if (firstName.value != "") {
    firstName.valid = true;
  } else {
    firstName.valid = false;
  }
});

lastName.addEventListener("input", () => {
  if (lastName.value != "") {
    lastName.valid = true;
  } else {
    lastName.valid = false;
  }
});

// event listener for email validation
email.addEventListener("blur", () => {
  const isValid = emailRegExp.test(email.value);
  if (!isValid) {
    const invalidEmailText = document.createTextNode(" Dumb Bitch!");
    emailError.appendChild(warnIcon);
    emailError.appendChild(invalidEmailText);
    emailError.style.color = invalidInputColor;
  } else {
    validEmailText = document.createTextNode(" Good Job!");
    email.valid = true;
    emailError.appendChild(checkIcon);
    emailError.appendChild(validEmailText);
    emailError.style.color = validInputColor;
  }
});

email.addEventListener("focus", () => {
  emailError.textContent = "";
});

// test phone input
window.intlTelInput(phoneNumber, {
  initialCountry: "auto",
  geoIpLookup: callback => {
    fetch("https://ipapi.co/json")
      .then(res => res.json())
      .then(data => callback(data.country_code))
      .catch(() => callback("us"));
  },
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@22.0.2/build/js/utils.js",
});

// event listeners for password validation
const pwConfirmer = function () {
  if (password.value && pwConfirm.value && password.value === pwConfirm.value) {
    const matchingPasswordsText = document.createTextNode(" Passwords match.");
    pwError.appendChild(checkIcon);
    pwError.appendChild(matchingPasswordsText);
    pwError.style.color = validInputColor;
    password.valid = true;
  } else if (!password.value || !pwConfirm.value) {
    pwError.textContent = "";
  } else {
    const nonMatchingPasswordsText = document.createTextNode(
      " Passwords don't match."
    );
    pwError.appendChild(warnIcon);
    pwError.appendChild(nonMatchingPasswordsText);
    pwError.style.color = invalidInputColor;
  }
};

const clearText = function (element) {
  element.textContent = "";
};

password.addEventListener("focus", () => clearText(pwError));
password.addEventListener("blur", pwConfirmer);

pwConfirm.addEventListener("focus", () => clearText(pwError));
pwConfirm.addEventListener("blur", pwConfirmer);

// add event listener for last step of validity
form.addEventListener("input", () => {
  if (firstName.valid && lastName.valid && email.valid && password.valid) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
});
