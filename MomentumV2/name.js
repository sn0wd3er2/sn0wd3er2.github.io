const formName = document.querySelector(".js-formName"),
    inputName = formName.querySelector("input"),
    showName = document.querySelector(".js-showName");
const nameQues = document.querySelector(".js-nameQues");

const NAME_STORE = "name";
const SHOWING = "showing";

function saveName(name) {
    localStorage.setItem(NAME_STORE, name);
}


function handleSubmit(event) {
    event.preventDefault();
    const currentName = inputName.value;
    saveName(currentName);
    paintName(currentName);
    inputName.value = "";
}

function setName() {
    nameQues.classList.add(SHOWING);
    formName.classList.add(SHOWING);
    formName.addEventListener("submit", handleSubmit);
}

function paintName(name) {
    nameQues.classList.remove(SHOWING);
    formName.classList.remove(SHOWING);
    showName.classList.add(SHOWING);
    showName.innerText = `Hello ${name}`;
}

function loadName() {
    const currentUser = localStorage.getItem(NAME_STORE);
    if (currentUser === null) {
        setName();
    } else {
        paintName(currentUser);
    }
}

function init() {
    loadName();
}

init();