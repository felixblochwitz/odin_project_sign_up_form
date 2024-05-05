const burger = document.querySelector(".burger-menu");
const burgerPopup = document.querySelector("#burger-menu-popup");
const popup = document.querySelector(".popup");

burger.addEventListener("click", () => {
  popup.style.display = "block";
});

burgerPopup.addEventListener("click", () => {
  popup.style.display = "";
});
