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

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { checkValidate, showNotification } from "./js/refs";
import * as CONST from "./js/constants";

const eventList = document.querySelector("ul.tasks-list");

const formInput = document.querySelector(".header-form");

const inputTitle = document.querySelector("input[name='taskName']");
const inputTask = document.querySelector("input[name='taskDescription']");
const inputDate = document.querySelector("input[name='dateTime']");

let userSelectedDate;

const options = {
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    //console.log(userSelectedDate);

    checkValidate(userSelectedDate, CONST.type_DATE, "Date")
  },
};

flatpickr(inputDate, options);

function addEvent() {
  const titleValue = inputTitle.value.trim();
  const titleDesc = inputTask.value.trim();

  try {
    const selectedDate = new Date(inputDate.value.trim());
  }
  catch {
    showNotification(CONST.state_ERROR, "Can not read entered date");
    return;
  }

  if (!checkValidate(userSelectedDate, CONST.type_DATE, "Date")) {
    return;
  }

  if (!checkValidate(titleValue, CONST.type_STRING, "Title")) {
    return;
  }

  if (!checkValidate(titleDesc, CONST.type_STRING, "Description")) {
    return;
  }

  const newEl =
    `<li class="task-list-item">
  <button class="task-list-item-btn">Delete</button>
  <h3>${titleValue.trim()}</h3>
  <p>${titleDesc.trim()}</p>
  <p>${userSelectedDate.toLocaleString("uk-UA", CONST.format_DATA)}</p>
  </li>`;

  //console.log(newEl);

  eventList.insertAdjacentHTML("beforeend", newEl);

  formInput.reset();

  showNotification(CONST.state_OK, "Event added", CONST.col_green);

}


formInput.addEventListener("submit", (e) => {
  e.preventDefault();
  addEvent();
});