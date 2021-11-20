const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container-2");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("cadastro-form-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("cadastro-form-mode");
});