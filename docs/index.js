const slider = document.getElementById("card__change-theme__slider");
slider.addEventListener("click", changeTheme, true);
let isDarkTheme = false;

function changeTheme() {
    document.documentElement.classList.toggle("dark");
    slider.style.setProperty("left", isDarkTheme ? "0%" : "80%");
    isDarkTheme = !isDarkTheme;
}
