//переменные поля ввода
let inputText = "";
let getText = "";
//переменная поля ввода, слушатель ввода
let addTaskInput = document.querySelector(".input__add_task");
addTaskInput.addEventListener("input", (event) => funcGetText(event));
//переменная кнопки добавить, слушатель клика. Привязаны функция создания  строчек задач и ф-я для добавления слушателей в эти строчки)
let addTaskButton = document.querySelector(".button__add_task");
addTaskButton.addEventListener("click", (event) => funcAddTask(event));
addTaskButton.addEventListener("click", (event) => funcChangeTask(event));
//переменная для отметки выполнения задания в чек листе, слушаель клика
let checkTask = "";
//переменная для удаления задания в чек листе, слушаель клика
let deleteTask = "";
//переменная для пешки задачи
let textTask = "";
//переменная блока чек-листа (привязан к диву под формой ввода)
let toDoListBlock = document.querySelector(".check__list_block");
//переменная для кнопки Удалить завершенные
let deleteDone = document.querySelector(".delete__done");
deleteDone.addEventListener("click", (event) => funcDeleteDone(event));

//переменная для кнопки Удалить все
let deleteAll = document.querySelector(".delete__all");
deleteAll.addEventListener("click", (event) => funcDeleteAll(event));

//ф-я записи в localStorage из поля ввода, вызывается событием ввода
const funcGetText = (event) => {
  inputText = event.target.value;
  console.log(event.target.value);
  localStorage.setItem("key", inputText);
  getText = localStorage.getItem("key", inputText);
};

//ф-я добавления в домДерево новых элементов (строчки туду листа), вызывается событием клика на кнпку добавить. Плюс добавление футера
const funcAddTask = (event) => {
  let toDoListline = document.createElement("div");
  toDoListBlock.append(toDoListline);
  toDoListline.className = "toDo__line";
  toDoListBlock.style.padding = "24px 0 24px 0";
  toDoListBlock.style.borderTop = "1px solid #dee2e6";
  toDoListline.insertAdjacentHTML(
    "afterbegin",
    "<button class='delete__todoline'></button>"
  );
  toDoListline.insertAdjacentHTML(
    "afterbegin",
    "<p class='text__todoline'>" + getText + "</p>"
  );
  toDoListline.insertAdjacentHTML(
    "afterbegin",
    "<input class='input__todoline' type='checkbox'>"
  );
  let toDoFooter = document.querySelector(".toDo__footer");
  toDoFooter.style.display = "flex";
};

//ф-я навешивания слушателей на новые кнопки
let funcChangeTask = (event) => {
  checkTask = document.querySelectorAll(".input__todoline");
  checkTask.forEach((elem) => {
    elem.addEventListener("click", (event) => funcCheckTask(event));
  });
  deleteTask = document.querySelectorAll(".delete__todoline");
  deleteTask.forEach((elem) => {
    elem.addEventListener("click", (event) => funcDeleteTask(event));
  });
  textTask = document.querySelectorAll(".text__todoline");
  textTask.forEach((elem) => {
    elem.className = "text__todoline";
  });
};

///ф-я для вычеркивания выполненной задачи из списка
let funcCheckTask = (event) => {
  event.target.checked
    ? (event.target.nextSibling.className = "done__text_todoline")
    : (event.target.nextSibling.className = "text__todoline");
};

//ф-я для удаления строчки при нажатии крестика
let funcDeleteTask = (event) => {
  event.target.parentElement.remove(".toDo__line");
};

//ф-я для удаления выполненных заданий (кнопка удалить выполненные)
let funcDeleteDone = (event) => {
  let checkedTasks = document.querySelectorAll(".toDo__line");
  checkedTasks.forEach((elem) => {
    if (elem.firstChild.nextSibling.className == "done__text_todoline") {
      elem.remove(".toDo__line");
    }
  });
};

//ф-я для удаления всех задач(кнопка удалить все)
let funcDeleteAll = (event) => {
  event.target.parentElement.previousSibling.previousSibling.innerHTML = "";
};
