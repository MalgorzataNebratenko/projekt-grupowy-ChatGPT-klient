var chatContainer = document.querySelector('.msg-page');
var msgButton = document.querySelector('#send-msg-btn');
var inputField = document.querySelector('#msg-input-field');
var msgModeButton = document.querySelector('#mode-btn');

msgModeButton.addEventListener('click', function() {
  var element = document.body;
  element.classList.toggle("dark-mode");
});

function createMessage(message, time, isOutgoing) {
    var messageContainer = document.createElement('div');
    messageContainer.classList.add(isOutgoing ? 'outgoing-chats' : 'received-chats');
  
    var messageImage = document.createElement('div');
    messageImage.classList.add(isOutgoing ? 'outgoing-chats-img' : 'received-chats-img');
    var imageSrc = isOutgoing ? 'user.png' : 'chatbot.png';
    messageImage.innerHTML = `<img src="${imageSrc}" />`;
  
    var messageContent = document.createElement('div');
    messageContent.classList.add(isOutgoing ? 'outgoing-msg' : 'received-msg');
    var messageHTML = `
      <div class="${isOutgoing ? 'outgoing-chats-msg' : 'received-msg-inbox'}">
        <p>${message}</p>
        <span class="time">${time}</span>
      </div>
    `;
    messageContent.innerHTML = messageHTML;
  
    messageContainer.appendChild(messageImage);
    messageContainer.appendChild(messageContent);
    chatContainer.appendChild(messageContainer);
}

msgButton.addEventListener('click', function() {
  var userMessage = inputField.value;
  if (userMessage.trim() !== '') {
    createMessage(userMessage, getCurrentTime(), true);
    inputField.value = ''; // Wyczyść pole input
    scrollToBottom(); // Opcjonalne przewinięcie do najnowszej wiadomości
  }
});

function getCurrentTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var day = now.getDay();
    var month = now.getMonth();
    var year = now.getFullYear();

    var timeString = hours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + '| ' + day + '.' + month + '.' + year;
    return timeString;
}

function scrollToBottom() {
    var chatContainer = document.querySelector('.msg-page');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// // Przykład użycia dla wiadomości przychodzącej
// createMessage("Hi !! This is a message from Riya.", "Riya", "18:06 PM | July 24", false);

// // Przykład użycia dla wiadomości wychodzącej
// createMessage("Hi riya, Lorem ipsum...", "User", "18:30 PM | July 24", true);
  