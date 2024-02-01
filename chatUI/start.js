"use strict";
import * as data from "./data.js";
 
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const snap = document.getElementById("start-btn");
const capturedImage = document.getElementById("capturedImage");
const errorMsgElement = document.getElementById("errorMsg");
const nameInput = document.getElementById("nameInput");
const submitNameBtn = document.getElementById("submitName");
const startBtn = document.getElementById("start-btn");
 
const constraints = {
  audio: true,
  video: {
    width: 320,
    height: 240,
  },
};

function goToChatPage() {
  setTimeout(() => {
    window.location.href = "http://127.0.0.1:5000/chat";
  }, 2000);
}
 
let capturedImageData = null;

async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    errorMsgElement.innerHTML = `navigator.getUserMedia.error: ${e.toString()}`;
  }
}

function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

var context = canvas.getContext("2d");
snap.addEventListener("click", function () {
  context.drawImage(video, 0, 0, 320, 240);
  capturedImageData = canvas.toDataURL("image/jpeg");
  sendImageToServer();
});
 
submitNameBtn.addEventListener("click", sendNameAndImage);
 
function handleServerResponse(response) {
  if (response == "not found") {
    nameInput.style.display = "block";
    submitNameBtn.style.display = "block";
    startBtn.style.display = "none";
  } else {
    data.setUsername(response);
    getUserHistoryChat(response)
  }
}

function getUserHistoryChat(username){
  const formData = new FormData();
  formData.append("username", username);

  var requestOptions = {
    method: "POST",
    body: formData,
    redirect: "follow",
  };

  fetch("http://localhost:5000/chat-history", requestOptions)
  .then((response) => {
    console.log(response);
    return response.text();
  })
  .then((result) => {
    console.log(result)
    data.setMessages(result);
    goToChatPage();
  })
  .catch((error) => console.log("error", error));
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
        console.log(result);
        handleServerResponse(result);
      })
      .catch((error) => console.log("error", error));
  }
}
init();