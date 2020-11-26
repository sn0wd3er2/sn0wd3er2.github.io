const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".js-todoList");

const finishToDoList = document.querySelector(".js-finishList");
const clearBtn = document.querySelector(".js-clearBtn");


const TODONAME = "todo";
const FINISHNAME = "finish";
const OVERLINE = "overlineText";

let toDos = [];
let finish = [];


function deleteDodo(event) {
    const btn = event.target;
    const del = btn.parentNode;
    const span = del.querySelector("span");
    todoList.removeChild(del);
    const cleanToDos = toDos.filter(function(todos) {
        return todos.id !== parseInt(del.id);
    })
    const finishToDos = toDos.filter(function(todos) {
        return todos.id === parseInt(del.id);
    })

    finish.push(finishToDos[0].text);
    finish = Array.from(new Set(finish));
    toDos = cleanToDos;
    storeSave(toDos);
    finishStoreSave(finish);

    clearElement(finishToDoList);
    loadFinishToDoList(FINISHNAME);
}

function clearElement(parent) {

    while (parent.lastElementChild !== null) {
        parent.removeChild(parent.lastElementChild);
    }
}

function paintFinishList(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = text;
    span.classList.add(OVERLINE);
    li.appendChild(span);
    finishToDoList.appendChild(li);

}

function finishStoreSave(obj) {
    localStorage.setItem(FINISHNAME, JSON.stringify(obj));
}

function storeSave(obj) {
    localStorage.setItem(TODONAME, JSON.stringify(obj)); // localStorage는 String으로만 저장됨
}

function paintList(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const newId = toDos.length + 1;
    delBtn.innerText = "Done";
    delBtn.addEventListener("click", deleteDodo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    todoList.appendChild(li);

    toDosObj = {
        text,
        id: newId
    }

    toDos.push(toDosObj);
    storeSave(toDos);
}

function loadToDoList(Name) {
    const loadedToDos = localStorage.getItem(Name);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            const text = toDo.text;
            paintList(text);
        })
    }
}

function loadFinishToDoList(Name) {
    const loadedToDos = localStorage.getItem(Name);
    if (loadedToDos !== null) {
        const parsedFinish = JSON.parse(loadedToDos);
        parsedFinish.forEach(function(fin) {
            const text = fin;
            paintFinishList(text);
            finish.push(text);
        })
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const currentToDo = todoInput.value;
    paintList(currentToDo);
    todoInput.value = "";
}

function handleClear(event) {
    event.preventDefault();
    finish = [];
    finishStoreSave(finish);
    clearElement(finishToDoList);
}

function init() {
    loadToDoList(TODONAME);
    loadFinishToDoList(FINISHNAME);
    todoForm.addEventListener("submit", handleSubmit);
    clearBtn.addEventListener("click", handleClear);
}

init();