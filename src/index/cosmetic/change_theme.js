document.getElementById("card__change-theme__slider")
    .addEventListener("click", changeTheme);

const N_PROPS = 6;
const PROPS_NAMES = ["-left-side-main-theme", "-right-side-main-theme",
    "-font-color", "-border-color", "-theme-change-strip-color",
    "-avatar-shadow-color"];

/* ======Default properties====== */
const DEFAULT_PREFIX = "--default";
const defaultThemePropsNames = new Array(N_PROPS);
for (let i = 0; i < N_PROPS; ++i) {
    defaultThemePropsNames[i] = DEFAULT_PREFIX + PROPS_NAMES[i];
}

const defaultThemePropsValues = new Array(N_PROPS);
for (let i = 0; i < N_PROPS; ++i) {
    defaultThemePropsValues[i] = getComputedStyle(document.documentElement)
        .getPropertyValue(defaultThemePropsNames[i]);
}

/* ======Light properties====== */
const LIGHT_PREFIX = "--light";
const lightThemePropsNames = new Array(N_PROPS);
for (let i = 0; i < N_PROPS; ++i) {
    lightThemePropsNames[i] = LIGHT_PREFIX + PROPS_NAMES[i];
}

const lightThemePropsValues = new Array(N_PROPS);
for (let i = 0; i < N_PROPS; ++i) {
    lightThemePropsValues[i] = getComputedStyle(document.documentElement)
        .getPropertyValue(lightThemePropsNames[i]);
}

/* ======Click processing====== */
let isDefaultTheme = true;
function changeTheme() {
    if (isDefaultTheme) {
        for (let i = 0; i < N_PROPS; ++i) {
            document.documentElement.style.setProperty(defaultThemePropsNames[i],
                lightThemePropsValues[i]);
        }
        slider.style.setProperty("left", "0%");
    } else {
        for (let i = 0; i < N_PROPS; ++i) {
            document.documentElement.style.setProperty(defaultThemePropsNames[i],
                defaultThemePropsValues[i]);
        }
        slider.style.setProperty("left", "80%");
    }

    isDefaultTheme = !isDefaultTheme;
}
