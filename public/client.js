const socket = io();

let username;
let textarea = document.querySelector("#textarea");

let messageArea = document.querySelector(".message__area");

const sendMessage = (msg) => {
  let message = {
    user: username,
    message: msg.trim(),
  };

  // append message
  appendMessage(message, "outgoing");
  textarea.value = "";

  //   send to server
  socket.emit("messageSend", message);
  scrollToBottom();
};

const appendMessage = (msg, type) => {
  let mainDiv = document.createElement("div");
  let className = type;

  mainDiv.classList.add(className, "message");

  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

  mainDiv.innerHTML = markup;

  messageArea.appendChild(mainDiv);
};

// scroll to latest message
const scrollToBottom = () => {
  messageArea.scrollTop = messageArea.scrollHeight;
};

do {
  username = prompt("Please enter your name");
} while (!username);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

// receive message
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});
