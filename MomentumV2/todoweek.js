const todoweekForm = document.querySelector(".js-todoweekForm"),
    todoweekInput = todoweekForm.querySelector("input"),
    todoweekList = document.querySelector(".js-todoweekList");

let todoweek = [];
const TODO_WEEK = 'todoweek'

function handleDelete(event) {
    event.preventDefault();
    const delText = event.target;
    const delLi = delText.parentNode;
    const delId = delLi.id;

    todoweekList.removeChild(delLi);
    const cleanToDoWeek = todoweek.filter(function(toDos) {
        return toDos.id !== parseInt(delId);
    })
    todoweek = cleanToDoWeek;
    storeWeekSave(todoweek)
}

function storeWeekSave(arr) {
    localStorage.setItem(TODO_WEEK, JSON.stringify(arr));
}

function paintWeekList(text) {
    const li = document.createElement("li"),
        span = document.createElement("span"),
        delbtn = document.createElement("button");
    const newId = todoweek.length + 1;

    delbtn.innerText = "Done";
    delbtn.addEventListener("click", handleDelete);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delbtn);
    li.id = newId;
    todoweekList.appendChild(li);

    todoweekObj = {
        text,
        id: newId
    }
    todoweek.push(todoweekObj);
    storeWeekSave(todoweek)
}

function loadToDoWeek() {
    const currentList = localStorage.getItem(TODO_WEEK);
    if (currentList !== null) {
        const text = JSON.parse(currentList);
        text.forEach(function(toDo) {
            paintWeekList(toDo.text);
        })
    }

}

function handleSubmit(event) {
    event.preventDefault();
    const inputValue = todoweekInput.value;
    paintWeekList(inputValue);
    todoweekInput.value = "";
}

function init() {
    loadToDoWeek();
    todoweekForm.addEventListener("submit", handleSubmit);
}

init();