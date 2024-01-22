// data.js
export function setUsername(username) {
    localStorage.setItem('username', username);
  }
  
  export function getUsername() {
    return localStorage.getItem('username') || '';
  }
  
  export function setMessages(messages) {
    localStorage.setItem('messages', JSON.stringify(messages));
  }
  
  export function getMessages() {
    const messagesString = localStorage.getItem('messages');
    return messagesString ? JSON.parse(messagesString) : [];
  }