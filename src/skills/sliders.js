function renderSlider(slider, sliderID) {
    slider.style.setProperty('--value', slider.value);
    slider.style.setProperty('--min', slider.min === '' ? '0' : slider.min);
    slider.style.setProperty('--max', slider.max === '' ? '100' : slider.max);
    slider.addEventListener('input', () => changeSkillSlider(slider, sliderID));
}

function changeSkillSlider(slider, sliderID) {
    slider.style.setProperty('--value', slider.value);
    document.getElementById(`${sliderID}__ratio`).innerHTML = slider.value + "%";
}
