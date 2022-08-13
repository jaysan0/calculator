const display = document.querySelector('#display');

const input = document.querySelector('#input');
const result = document.querySelector('#result')

const btns = document.querySelector('#calculator');

let def = 0; // the number selected will be stored here
let operator = null;

let prev = 0; // takes the previous number in an operation
let total = "0"; // stores the result

btns.addEventListener('click', (event) => {
    // console.log(event.target.innerHTML);
    if (isNaN(parseInt(event.target.innerHTML))) {
        symbolClick();
    } else {
        numberClick();
    }
})

function symbolClick () {
    switch (event.target.innerHTML) {
        case "C":
            def = 0;
            resetDisplay();
            operator = null;
            break;
        case "←":
            if (def.length === 1) {
                def = 0
            } else {
                def = def.substring(0, def.length - 1);
            }
            input.textContent = def;
            break;
        case "=":
            operate();
            break;
        case "+":
        case "−":
        case "×":
        case "÷":
            operators();
            break;
        default:
            break;
    }
}

function numberClick () {
    if (def === 0) { // no number has been stored in def yet, store the number selected
        def = event.target.innerHTML;
    } else { // if a number is already stored, concatenate the numbers together
        def += event.target.innerHTML;
    }
    console.log(def);
    input.textContent = def;
}

function operators () {
    if (prev !== 0) { // if there is a number stored in prev, operate
        operate();
    }
    operator = event.target.innerHTML;
    console.log(operator)
    if (total === "0") { // if total is still a string, that means, if no operation has taken place yet, store def in prev
        prev = def;
    } else { // if there is already a total, then store it in prev to be operated on
        prev = total;
    }
    def = 0;
}


function operate () {
    console.log(operator);
    if (operator === '+') {
        total = parseFloat(prev) + parseFloat(def);
    } else if (operator === '−') {
        total = parseFloat(prev) - parseFloat(def);
    } else if (operator === '×') {
        if (def === 0) {
            return;
        }
        total = parseFloat(prev) * parseFloat(def);
    } else if (operator === '÷') {
        if (def == 0) {
            return result.textContent = "Wait, That's Illegal";
        }
        total = parseFloat(prev) / parseFloat(def);
    }
    prev = total;
    result.textContent = total;
    // operator = null;
}

function resetDisplay () {
    def = 0;
    prev = 0
    input.textContent = def;
    total = "0";
    result.textContent = total;
}