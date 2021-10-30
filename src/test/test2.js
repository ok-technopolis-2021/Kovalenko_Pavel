console.error("JS says hello");
var n;
console.log("var: " + n + "\n");
n = 5;
console.log("var: " + n + "\n");
n += "5";
console.log("var: " + n + "\n");
console.log("res: " + ("" * ""));
var arr = [
    [1, 2, 3], [1, 2], ["s"]
];
arr[2] = "s";
console.log(arr)
if (5 == 5) {
    console.log("ok")
}

alert("Wwww");
var data = confirm("Yes?");
console.log(data);
var data1 = prompt("llll");
console.log(data1);
alert("Hello, " + data1);

function info(word) {
    console.log(word + 1);
}

info(true);

function gamma(arr) {
    let gamma = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            gamma += arr[i][j];
        }
    }
    console.log(gamma);
}

gamma([[1, 2], [3, 4]]);
