// import { username, messages } from 'data.js';
import * as data from './data.js';
document.addEventListener("DOMContentLoaded", function () {
  var chatContainer = document.querySelector(".msg-page");
  var msgButton = document.querySelector("#send-msg-btn");
  var inputField = document.querySelector("#msg-input-field");
  var msgModeButton = document.querySelector("#mode-btn");
  const mySlider = document.getElementById("my-slider");
  const sliderValue = document.getElementById("slider-value");
  var recognisedUser = false;
  const muteImg = document.getElementById("mute-img");
  const muteBtn = document.getElementById("mute-btn");
  const micBtn = document.getElementById("mic-btn");
  const messageInput = document.getElementById("msg-input-field");
  const sendMessageBtn = document.getElementById("send-msg-btn");
  const displayUsername = document.getElementById("display_username");
  const opinionForm = document.getElementById("myForm");
  const opinionBtn = document.getElementById("opinionBtn");
  const submitBtn = document.getElementById("submitBtn");
  const starrating = document.getElementById("star-rating");
  const username = data.getUsername();
  displayUsername.textContent = username;
 
  let isRecording = false;
  let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.msSpeechRecognition)();
  recognition.lang = 'pl-PL';
  //let audioRecorder;
  //let audioChunks = [];

  function atLoad(){
    restoreMessageHistory();
  }
  atLoad();
 
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
    var imageSrc = isOutgoing ? "http://127.0.0.1:5000/chatUI/user.png" : "http://127.0.0.1:5000/chatUI/chatbot.png";
 
// http://127.0.0.1:5000/chatUI/chatbot.png
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
    scrollToBottom();
  }
 
  // msgButton.addEventListener("click", function () {
  //
  // });
 
  function showUserMessage() {
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
    var day = now.getDate();
    var month = now.getMonth() + 1; // Dodaj 1, ponieważ miesiące są numerowane od 0 do 11
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
    var valPercent = (mySlider.value / mySlider.max) * 100;
    mySlider.style.background = `linear-gradient(to right, #158fcc ${valPercent}%, #a9e5ff ${valPercent}%)`;
    sliderValue.textContent = mySlider.value;
 
    if (mySlider.value == 0) {
      muteImg.src = "http://127.0.0.1:5000/chatUI/mute.png";
    } else {
      muteImg.src = "http://127.0.0.1:5000/chatUI/unmute.png";
    }
  }
 
  function firstMessage() {
    const userMessage = "Witaj " + username + ", o czym chciałbyś porozmawiać?"
    // if (recognisedUser) {
    //   userMessage = "Witaj ... o czym chciałbyś dzisiaj porozmawiać?";
    // } else {
    //   userMessage = "Cześć nieznajomy, jak masz na imię?";
    // }
    createMessage(userMessage, getCurrentTime(), false);
  }

 
  opinionBtn.addEventListener("click", function(){
    opinionForm.style.display = "block";
  })
 
  submitBtn.addEventListener("click", function () {
    var formdata = new FormData();
    // Get the selected rating
    var selectedRating = document.querySelector('input[name="rating"]:checked');
    var rate = selectedRating ? selectedRating.value : null;
    console.log(rate);
    formdata.append("username", username)
    formdata.append("rate", rate);
    if (rate == null)
    {
      opinionForm.style.display = "none";
    }
    else{
 
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
 
    fetch("http://localhost:5000/rate", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((result) => {
      console.log(result);
      return result; // zwracamy wynik, aby go przekazać do kolejnego .then()
    })
    .then((responseChat) => {
      createMessage(responseChat, getCurrentTime(), false);
    })
    .catch((error) => console.error("Error:", error));
 
    opinionForm.style.display = "none";
  }
  });
 
  function changeMuteBtnImage() {
    if (mySlider.value > 0) {
      //audio.muted = true;
      mySlider.value = 0;
      muteImg.src = "http://127.0.0.1:5000/chatUI/mute.png";
    } else {
      //audio.muted = false;
      mySlider.value = 50;
      muteImg.src = "http://127.0.0.1:5000/chatUI/unmute.png";
    }
    slider();
  }
 
  muteBtn.addEventListener("click", function(){
    changeMuteBtnImage();
  })
 
  mySlider.addEventListener("input", function(){
    slider();
    // changeMuteBtnImage();
  });
 /*
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      // Initialize the media recorder object
      audioRecorder = new MediaRecorder(stream);

      // dataavailable event is fired when the recording is stopped
      audioRecorder.addEventListener("dataavailable", (e) => {
        audioChunks.push(e.data);
      });

      audioRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const formdata = new FormData();
        formdata.append("audio", audioBlob);

        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };

        fetch("http://localhost:5000/audio", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          // console.log(result);
          // Obsłuż odpowiedź z serwera
        //   handleServerResponse(result);
        // goToChatPage();
        console.log(result);
        })
        .catch((error) => console.log("error", error));
        // Post data to server
        //fetch('/upload', {
        //    method: 'POST',
        //    body: formData,
        //});
        audioChunks = [];
      };

      // Start recording when the button is clicked and held
      micBtn.addEventListener("mousedown", () => {
        if (!isRecording) {
          isRecording = true;
          audioRecorder.start();
        }
      });

      // Stop recording when the button is released
      micBtn.addEventListener("mouseup", () => {
        if (isRecording) {
          audioRecorder.stop();
          isRecording = false;
        }
      });
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
    */

  const startRecording = () => {
    recognition.onstart = () => {
        //console.log('Recording started');
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        messageInput.value = transcript;
        //console.log(transcript);
    };

    recognition.onerror = (event) => {
        console.error('Error occurred:', event.error);
    };
    recognition.start();
  };

  // Start recording when the button is clicked and held
  micBtn.addEventListener("mousedown", () => {
    if (!isRecording) {
      isRecording = true;
      startRecording();
    }
  });

  // Stop recording when the button is released
  micBtn.addEventListener("mouseup", () => {
    if (isRecording) {
      isRecording = false;
      if (recognition) {
        recognition.stop();
      }
    }
  });
 
  sendMessageBtn.addEventListener("click", function () {
    var formdata = new FormData();
    var message = messageInput.value;
    var responseChat;
    formdata.append("username", username);
    formdata.append("message", message);
    console.log(formdata);
    console.log(message);
 
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
 
    fetch("http://localhost:5000/message", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((result) => {
      console.log(result);
      return result; // zwracamy wynik, aby go przekazać do kolejnego .then()
    })
    .then((responseChat) => {
      var msg = new SpeechSynthesisUtterance();
      msg.text = responseChat;
      msg.lang = 'pl-PL';
      msg.volume = sliderValue.textContent / 100;
      window.speechSynthesis.speak(msg);
      createMessage(responseChat, getCurrentTime(), false);
    })
    .catch((error) => console.error("Error:", error));
 
    showUserMessage();
  });

  function restoreMessageHistory() {
    const message_history = JSON.parse(data.getMessages());
    console.log(message_history);
  
    message_history.forEach(entry => {
      // Dla każdego wpisu w historii tworzymy wiadomość użytkownika i odpowiedź modelu
      var userMessage = entry[0];
      var modelResponse = entry[1];
      var datetimeString = entry[2];
  
      var formatedDate= formatChatDate(datetimeString)
      // Konwertujemy string z datą na obiekt Date
      // var datetime = new Date(datetimeString);
  
      // Tworzymy wiadomość użytkownika
      createMessage(userMessage, formatedDate, true);
  
      // Tworzymy odpowiedź modelu
      createMessage(modelResponse, formatedDate, false);
    });
    firstMessage();
  }

  function formatChatDate(datetimeString) {
    var datetime = new Date(datetimeString);
  
    var hours = datetime.getHours();
    var minutes = datetime.getMinutes();
    var day = datetime.getDate();
    var month = datetime.getMonth() + 1; // Dodaj 1, ponieważ miesiące są numerowane od 0 do 11
    var year = datetime.getFullYear();
  
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
 
});