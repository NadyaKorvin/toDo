//логин/пароль
let userName = "";
let userPassword = "";
//Переменная кнопки вызова попапа + вешаем слушателя клика
let registratioButton = document.querySelector(".registration__button");
registratioButton.addEventListener("click", (event) => showPopUp(event));
//Переменная кнопки отмены регистрации + вешаем слушателя клика
let canselRegistration = document.querySelector(".cansel");
canselRegistration.addEventListener("click", (event) => closePopUp(event));
//Кнопочка решистрации
let putRegistratoin = document.querySelector(".put__registration");
putRegistratoin.addEventListener("click", (event) => recordUser(event));
//переменные-слушатели ввода данных в фое регистрации
let putName = document.querySelector(".put__name");
putName.addEventListener("input", (event) => recordName(event));
let putPassword = document.querySelector(".put__password");
putPassword.addEventListener("input", (event) => recordPassword(event));
//Вывод приветствия в хедер
let showUserOnHeader = () => {
  let getUserName = localStorage.getItem("key");
  let header = document.querySelector(".header");
  header.insertAdjacentHTML(
    "beforeEnd",
    "<p class='hi__user'> Привет, " + getUserName + "!</p>"
  );
  console.log(getUserName);
};
showUserOnHeader();
//ПОКАЗАТЬ/скрыть ПОП_АП
const showPopUp = (event) => {
  document.querySelector(".main").style.display = "none";
  document.querySelector(".registration__pop_up").style.display = "flex";
};
const closePopUp = (event) => {
  document.querySelector(".main").style.display = "block";
  document.querySelector(".registration__pop_up").style.display = "none";
};
//ЗАПИСЬ логин/пароль
const recordName = (event) => {
  userName = event.target.value;
};
const recordPassword = (event) => {
  userPassword = event.target.value;
};
//Регистрация (ПОЛУЧЕНИЕ ЛОГИНА ПАРОЛЯ)
const recordUser = async (event) => {
  userPassword =
    event.target.parentElement.previousSibling.previousSibling.value;
  userName =
    event.target.parentElement.previousSibling.previousSibling.previousSibling
      .previousSibling.value;
  document.querySelector(".main").style.display = "block";
  document.querySelector(".registration__pop_up").style.display = "none";
  localStorage.setItem("key", userName);
  document.querySelector(".header").innerHTML = "";
  showUserOnHeader();
  putRegistrationApi(userName, userPassword);
};
//Регистрация (СЕРВЕР)
let putRegistrationApi = async (userName, userPassword) => {
  return await fetch("http://24api.ru/rest-user", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      username: userName,
      password: userPassword,
    }),
  });
};

//получить данные о зарегистрированном пользователе
// let getLastUserInfo = async (id) => {
//   return await fetch("http://24api.ru/rest-user/" + id, {
//     method: "GET",
//     headers: { "Content-type": "application/json" },
//   });
// };
