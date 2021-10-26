document.getElementById("card__change-theme__slider")
    .addEventListener("click", changeTheme);

const N_PROPS = 6;
const PROPS_NAMES = ["-left-side-main-theme", "-right-side-main-theme",
    "-font-color", "-border-color", "-theme-change-strip-color",
    "-avatar-shadow-color"];
const DEFAULT_PREFIX = "--default";
const LIGHT_PREFIX = "--light";

const defaultThemePropsNames = new Array(N_PROPS);
for (let i = 0; i < N_PROPS; ++i) {
    defaultThemePropsNames[i] = DEFAULT_PREFIX + PROPS_NAMES[i];
}

const lightThemePropsNames = new Array(N_PROPS);
for (let i = 0; i < N_PROPS; ++i) {
    lightThemePropsNames[i] = LIGHT_PREFIX + PROPS_NAMES[i];
}

let isDefaultTheme = true;
function changeTheme() {
    if (isDefaultTheme) {
        for (let i = 0; i < N_PROPS; ++i) {
            document.documentElement.style.setProperty(defaultThemePropsNames[i],
                getComputedStyle(document.documentElement)
                    .getPropertyValue(lightThemePropsNames[i]));
        }
    } else {
        for (let i = 0; i < N_PROPS; ++i) {
            document.documentElement.style.setProperty(defaultThemePropsNames[i],
                getComputedStyle(document.documentElement)
                    .getPropertyValue(defaultThemePropsNames[i]));
        }
    }

    isDefaultTheme = !isDefaultTheme;
}
