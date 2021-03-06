'use strict';

const API_URL = `https://21.javascript.pages.academy/keksobooking`;
const TIMEOUT_IN_MS = 10000;

const Method = {
  GET: `GET`,
  POST: `POST`
};

const StatusCode = {
  OK: 200
};

const getServerResponse = (xhr, onSuccess, onError) => {
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Ошибка сервера ${xhr.status}`);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;
};

const load = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();

  getServerResponse(xhr, onSuccess, onError);

  xhr.open(Method.GET, `${API_URL}/data`);
  xhr.send();
};

const upload = (data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();

  getServerResponse(xhr, onSuccess, onError);
  xhr.open(Method.POST, `${API_URL}`);
  xhr.send(data);
};

window.backend = {
  load,
  upload
};
