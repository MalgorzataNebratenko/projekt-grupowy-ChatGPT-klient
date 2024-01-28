"use strict";
// import { username, messages } from './data.js';
import * as data from "./data.js";
 
// uruchomienie do pythona ze ścieżki startUI :))
// python -m http.server
 
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const snap = document.getElementById("start-btn");
// const save = document.getElementById('save');
// const send = document.getElementById('send');
// const imageNameInput = document.getElementById('imageName');
const capturedImage = document.getElementById("capturedImage");
const errorMsgElement = document.getElementById("errorMsg");
const nameInput = document.getElementById("nameInput");
const submitNameBtn = document.getElementById("submitName");
// const labelName = document.getElementById("labelName");
const startBtn = document.getElementById("start-btn");
 
const constraints = {
  audio: true,
  video: {
    width: 320,
    height: 240,
  },
};
 
//dodanie opóźnienia czasowego żeby zdążyć przesłać zdjęcie
function goToChatPage() {
  setTimeout(() => {
    window.location.href = "http://127.0.0.1:5000/chat";
  }, 2000);
}
 
let capturedImageData = null;
 
// Access webcam
async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    errorMsgElement.innerHTML = `navigator.getUserMedia.error: ${e.toString()}`;
  }
}
 
// Success
function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}
 
// Draw image
var context = canvas.getContext("2d");
snap.addEventListener("click", function () {
  context.drawImage(video, 0, 0, 320, 240);
  capturedImageData = canvas.toDataURL("image/jpeg");
  // capturedImage.src = capturedImageData;
  // capturedImage.style.display = "block";
 
  sendImageToServer();
 
  // goToChatPage()
});
 
// function sendImageToServer() {
//     if (capturedImageData) {
//         // Usuń początkowy fragment "data:image/jpeg;base64,"
//         const imageDataWithoutHeader = capturedImageData.split(',')[1];
//         console.log(imageDataWithoutHeader);
 
//         // Przygotuj dane do wysłania na serwer
//         const formData = new FormData();
//         formData.append('imageData', imageDataWithoutHeader);
 
//         var requestOptions = {
//             method: "POST",
//             mode: 'no-cors',
//             body: formData,
//             redirect: "follow",
//         };
 
//         // Wysyłanie danych na serwer przy użyciu Fetch API
//         fetch("http://localhost:5000/photo", requestOptions)
//             .then((response) => response.text())
//             .then((result) => console.log(result))
//             .catch((error) => console.log("error", error));
 
//         goToChatPage()
//     }
// }
 
submitNameBtn.addEventListener("click", sendNameAndImage);
 
function handleServerResponse(response) {
  if (response == "not found") {
    // Jeżeli odpowiedź z serwera to 'not found', pokaż pole input
    nameInput.style.display = "block";
    submitNameBtn.style.display = "block";
    // labelName.style.display = "block";
    startBtn.style.display = "none";
    // console.log('this is response',response);
  } else {
    // Jeżeli odpowiedź jest inna, wykonaj funkcję goToChatPage()
    // console.log(response, '2');
    data.setUsername(response);
    goToChatPage();
  }
}
 
function sendNameAndImage() {
  const newUsername = nameInput.value;
  data.setUsername(newUsername);
  const imageDataWithoutHeader = capturedImageData.split(",")[1];
  const formData = new FormData();
  formData.append("imageData", imageDataWithoutHeader);
  formData.append("usernameData", newUsername);
 
  var requestOptions = {
    method: "POST",
    body: formData,
    redirect: "follow",
  };
 
  fetch("http://localhost:5000/new-photo", requestOptions)
    .then((response) => {
      console.log(response);
      response.text()
    })
    .then((result) => {
      // console.log(result);
      // Obsłuż odpowiedź z serwera
      // handleServerResponse(result);
      goToChatPage();
    })
    .catch((error) => console.log("error", error));
}
 
function sendImageToServer() {
  if (capturedImageData) {
    const imageDataWithoutHeader = capturedImageData.split(",")[1];
    const formData = new FormData();
    formData.append("imageData", imageDataWithoutHeader);
 
    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };
 
    fetch("http://localhost:5000/photo", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // console.log(result);
        // Obsłuż odpowiedź z serwera
        handleServerResponse(result);
      })
      .catch((error) => console.log("error", error));
  }
}
 
init();