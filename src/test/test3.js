var counter = 0;

function onClick(elem) {
    ++counter;
    alert(counter);
    elem.innerHTML = "You turn on burron: " + counter;
    console.log(elem.onclick);
}

function onInput(elem) {
    console.log(elem.value);
    elem.style.background = "red";
    elem.style.color = "#333";
}

var text = document.getElementById('text');
console.log(text.id);
console.log(text.title);
