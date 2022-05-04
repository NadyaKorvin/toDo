//переменные поля ввода
let inputText = "";
//переменная поля ввода, слушатель ввода
let addTaskInput = document.querySelector(".input__add_task");
addTaskInput.addEventListener("input", (event) => listenInputText(event));
//переменная кнопки добавить, слушатель клика. Привязаны функция создания  строчек задач и ф-я для добавления слушателей в эти строчки)
let addTaskButton = document.querySelector(".button__add_task");
addTaskButton.addEventListener("click", (event) => callPostNewTask(event));
//получаем массив всех задач пользователя
//переменная для кнопки Удалить завершенные
let deleteDone = document.querySelector(".delete__done");
deleteDone.addEventListener("click", (event) => funcDeleteDone(event));
//переменная для кнопки Удалить все
let deleteAll = document.querySelector(".delete__all");
deleteAll.addEventListener("click", (event) => funcDeleteAll(event));
//Получени данных с сервера
let getAllTasks = async () => {
  const response = await fetch("http://24api.ru/rest-todo/items-by-id?id=11", {
    method: "GET",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(),
  });
  return await response.json();
};
let callGetFromApiAll = async () => {
  getAllTasks().then((obj) => {
    obj.forEach((elem) => {
      createTaskLine(elem.name, elem.id);
    });
    putListenersOnTaskLine(
      ".input__todoline",
      ".text__todoline",
      ".delete__todoline"
    );
  });
};
callGetFromApiAll();
//отправка данных о новой задаче
const postNewTask = async (inputText) => {
  const response = await fetch("http://24api.ru/rest-todo", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      name: inputText,
      isDone: 0,
      user_id: 11,
    }),
  });
  return await response.json();
};
//ф-я палучения инпута из поля ввода, вызывается событием ввода
const listenInputText = (event) => {
  inputText = event.target.value;
};
//ф-я получения данных из инпута при нажатии кнопк Добавить и запуск отправки новыой задачи на сервер
const callPostNewTask = (event) => {
  inputText = event.target.previousSibling.previousSibling.value;
  postNewTask(inputText).then((tasks) => {
    createTaskLine(tasks.name, tasks.id);
    putListenersOnTaskLine(
      ".input__todoline",
      ".text__todoline",
      ".delete__todoline"
    );
  });
};
//ф-я добавления в домДерево новых элементов (строчки туду листа), вызывается при получении данных с сервера. Плюс добавление футера
const createTaskLine = (name, id) => {
  let toDoListBlock = document.querySelector(".check__list_block");
  let toDoListline = document.createElement("div");
  toDoListBlock.append(toDoListline);
  toDoListline.dataset.id = id;
  toDoListline.className = "toDo__line";
  toDoListBlock.style.padding = "24px 0 24px 0";
  toDoListBlock.style.borderTop = "1px solid #dee2e6";
  toDoListline.insertAdjacentHTML(
    "afterbegin",
    "<button class='delete__todoline'></button>"
  );
  toDoListline.insertAdjacentHTML(
    "afterbegin",
    "<p class='text__todoline'>" + name + "</p>"
  );
  toDoListline.insertAdjacentHTML(
    "afterbegin",
    "<input class='input__todoline' type='checkbox'>"
  );
  let toDoFooter = document.querySelector(".toDo__footer");
  toDoFooter.style.display = "flex";
};
// ф-я изменения статуса задачи и отправки данных на сервер
const changeTask = async (isDone, id) => {
  const response = await fetch("http://24api.ru/rest-todo/" + id, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      isDone: isDone,
      user_id: 11,
    }),
  });
  return await response.json();
};
//ф-я навешивания слушателей на новые кнопки
let putListenersOnTaskLine = (check, text, deleteLine) => {
  let checkTask = document.querySelectorAll(check);
  checkTask.forEach((elem) => {
    elem.addEventListener("click", (event) => putIsDoneStatus(event));
  });
  let deleteTask = document.querySelectorAll(deleteLine);
  deleteTask.forEach((elem) => {
    elem.addEventListener("click", (event) => funcDeleteTask(event));
  });
  let textTask = document.querySelectorAll(text);
  textTask.forEach((elem) => {
    elem.className = "text__todoline";
  });
};
///ф-я ВЫЧЕРКНУТЬ ВЫПОЛНЕНННОЕ задачи из списка и вызов функции отправки изменений на сервер
let putIsDoneStatus = (event) => {
  event.target.checked
    ? (event.target.nextSibling.className = "done__text_todoline") &&
      changeTask(1, event.target.parentElement.dataset.id)
    : (event.target.nextSibling.className = "text__todoline") &&
      changeTask(0, event.target.parentElement.dataset.id);
};
//ф-я УДАЛЕНИЕ КРЕСТИКОМ (при нажатии крестика и вызов внесеня изменений на сервере)
let funcDeleteTask = (event) => {
  event.target.parentElement.remove(".toDo__line");
  deleteOneTask(event.target.parentElement.dataset.id);
};
//ф-я для удаления строчки при нажатии крестика НА СЕРВЕРЕ
let deleteOneTask = async (id) => {
  return await fetch("http://24api.ru/rest-todo/" + id, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
  });
};
//ф-я УДАЛЕНИЕ ВЫПОЛНЕННЫХ заданий (кнопка удалить выполненные)
let funcDeleteDone = (tasks) => {
  tasks = document.querySelectorAll(".toDo__line");
  tasks.forEach((elem) => {
    if (elem.firstChild.nextSibling.className == "done__text_todoline") {
      elem.remove(".toDo__line");
    }
  });
  getListForDelDoneFromApi();
};
///УДАЛИТЬ ВЫПОЛНЕННОЕ  запись массива со списком id + делит
let getListForDelDoneFromApi = async () => {
  let task = "";
  getAllTasks()
    .then((obj) => {
      obj.forEach((elem) => {
        if (elem.isDone == 1 && elem.user_id == 11) {
          task += `${elem.id} `;
        }
      });
      let tasksForDelete = task.trim().split(" ");
      return tasksForDelete;
    })
    .then((array) => {
      array.forEach((elem) => {
        deleteOneTask(+elem);
      });
    });
};
//УДАЛИТЬ ВСЕ сервер
let deleteAllTasks = async (arrayTasks) => {
  return await fetch("http://24api.ru/rest-todo/delete-items", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ items: arrayTasks }),
  });
};
//УДАЛИТЬ ВСЕ сайт и вызов функции работы с сервером
let funcDeleteAll = async (event) => {
  let task = "";
  event.target.parentElement.previousSibling.previousSibling.innerHTML = "";
  getAllTasks()
    .then((obj) => {
      obj.forEach((elem) => {
        if (elem.user_id == 11) {
          task += `${elem.id} `;
        }
      });
      let tasksForDelete = task.trim().split(" ");
      return tasksForDelete;
    })
    .then((array) => {
      deleteAllTasks(array);
    });
};
