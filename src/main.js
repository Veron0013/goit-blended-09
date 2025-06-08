/*
  Створи список справ.
  На сторінці є два інпути які має вводиться назва і текст задачі.
  Після натискання на кнопку "Add" завдання додається до списку #task-list.

  У кожної картки має бути кнопка "Delete", щоб можна було
  прибрати завдання зі списку.
  Список із завданнями має бути доступним після перезавантаження сторінки.

  Розмітка картки задачі
  <li class="task-list-item">
      <button class="task-list-item-btn">Delete</button>
      <h3>Заголовок</h3>
      <p>Текст</p>
  </li>
*/

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { checkValidate } from "./js/refs";

const _OK = "OK";
const _NO = "NO";

const type_STRING = "string";
const type_Num = "num";

const state_OK = "Success";
const state_ERROR = "Error";

const col_red = "#ef4040";
const col_green = "#008000";


const eventList = document.querySelector("ul.tasks-list");

const formInput = document.querySelector(".header-form");
//const btnAdd = document.querySelector("header-form-btn");
const inputTitle = document.querySelector("input[name='taskName']");
const inputTask = document.querySelector("input[name='taskDescription']");



function addEvent() {
  let objVal = {};

  const titleValue = inputTitle.value.trim();
  const titleDesc = inputTask.value.trim();

  objVal = checkValidate(titleValue, type_STRING, "Title");

  if (objVal.state !== _OK) {
    showNotification(state_ERROR, objVal.message);
    return;
  }

  objVal = checkValidate(titleDesc, type_STRING, "Description");

  if (objVal.state !== _OK) {
    showNotification(state_ERROR, objVal.message);
    return;
  }

  const newEl =
    `<li class="task-list-item">
  <button class="task-list-item-btn">Delete</button>
  <h3>${titleValue.trim()}</h3>
  <p>${titleDesc.trim()}</p>
  </li>`;

  console.log(newEl);

  eventList.insertAdjacentHTML("beforeend", newEl);

  inputTitle.value = "";
  inputTask.value = "";

  showNotification(state_OK, "Event added", col_green);

}

function showNotification(state, message, type = col_red) {
  iziToast.show({
    id: String(state).toLocaleLowerCase(),
    title: state,
    message: message,
    messageColor: 'white',
    color: type,
    position: 'bottomCenter',
  });
}


formInput.addEventListener("submit", (e) => {
  e.preventDefault();
  addEvent();
});