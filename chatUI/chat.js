document.addEventListener("DOMContentLoaded", function () {
var chatContainer = document.querySelector(".msg-page");
var msgButton = document.querySelector("#send-msg-btn");
var inputField = document.querySelector("#msg-input-field");
var msgModeButton = document.querySelector("#mode-btn");
const mySlider = document.getElementById("my-slider");
const sliderValue = document.getElementById("slider-value");
var recognisedUser = false;
const muteImg = document.getElementById("mute-img");
const micBtn = document.getElementById("mic-btn");
const messageInput = document.getElementById("msg-input-field");
const sendMessageBtn = document.getElementById("send-msg-btn");

let isRecording = false;

micBtn.addEventListener("mousedown", startRecording);
micBtn.addEventListener("mouseup", stopRecording);

msgModeButton.addEventListener("click", function () {
  var element = document.body;
  element.classList.toggle("dark-mode");
});

function createMessage(message, time, isOutgoing) {
  var messageContainer = document.createElement("div");
  messageContainer.classList.add(
    isOutgoing ? "outgoing-chats" : "received-chats"
  );

  var messageImage = document.createElement("div");
  messageImage.classList.add(
    isOutgoing ? "outgoing-chats-img" : "received-chats-img"
  );
  var imageSrc = isOutgoing ? "user.png" : "chatbot.png";
  messageImage.innerHTML = `<img src="${imageSrc}" />`;

  var messageContent = document.createElement("div");
  messageContent.classList.add(isOutgoing ? "outgoing-msg" : "received-msg");
  var messageHTML = `
      <div class="${isOutgoing ? "outgoing-chats-msg" : "received-msg-inbox"}">
        <p>${message}</p>
        <span class="time">${time}</span>
      </div>
    `;
  messageContent.innerHTML = messageHTML;

  messageContainer.appendChild(messageImage);
  messageContainer.appendChild(messageContent);
  chatContainer.appendChild(messageContainer);
}

// msgButton.addEventListener("click", function () {
//  
// });

function showUserMessage(){
  var userMessage = inputField.value;
    if (userMessage.trim() !== "") {
      createMessage(userMessage, getCurrentTime(), true);
      inputField.value = ""; // Wyczyść pole input
      scrollToBottom();
    }
}

function getCurrentTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var day = now.getDay();
  var month = now.getMonth();
  var year = now.getFullYear();

  var timeString =
    hours +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes +
    " " +
    "| " +
    day +
    "." +
    month +
    "." +
    year;
  return timeString;
}

function scrollToBottom() {
  var chatContainer = document.querySelector(".msg-page");
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function slider() {
  valPercent = (mySlider.value / mySlider.max) * 100;
  mySlider.style.background = `linear-gradient(to right, #158fcc ${valPercent}%, #a9e5ff ${valPercent}%)`;
  sliderValue.textContent = mySlider.value;

  if (mySlider.value == 0) {
    muteImg.src = "./mute.png";
  } else {
    muteImg.src = "./unmute.png";
  }
}

function firstMessage() {
  if (recognisedUser) {
    userMessage = "Witaj ... o czym chciałbyś dzisiaj porozmawiać?";
  } else {
    userMessage = "Cześć nieznajomy, jak masz na imię?";
  }
  createMessage(userMessage, getCurrentTime(), false);
}
firstMessage();

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function changeMuteBtnImage() {
  if (mySlider.value > 0) {
    //audio.muted = true;
    mySlider.value = 0;
    muteImg.src = "./mute.png";
    slider();
  } else {
    //audio.muted = false;
    mySlider.value = 50;
    muteImg.src = "./unmute.png";
    slider();
  }
}

function startRecording() {
  isRecording = true;
  console.log("Rozpoczęto nagrywanie...");
}

function stopRecording() {
  if (isRecording) {
    isRecording = false;
    console.log("Zakończono nagrywanie...");
  }
}

sendMessageBtn.addEventListener("click", function () {
  var formdata = new FormData();
  var message = messageInput.value;
  formdata.append("message", message);
  console.log(formdata);
  console.log(message);

  var requestOptions = {
    method: "POST",
    mode: 'no-cors',
    body: formdata,
    redirect: "follow",
  };

  fetch("http://localhost:5000/message", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  showUserMessage()
});

// var formdata = new FormData();
// formdata.append("message", "data");

// var requestOptions = {
//   method: 'POST',
//   body: formdata,
//   redirect: 'follow'
// };

// fetch("http://localhost:5000/message", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

// // Przykład użycia dla wiadomości przychodzącej
// createMessage("Hi !! This is a message from Riya.", "Riya", "18:06 PM | July 24", false);

// // Przykład użycia dla wiadomości wychodzącej
// createMessage("Hi riya, Lorem ipsum...", "User", "18:30 PM | July 24", true);

});
