function sendMessage() {
  const input = document.getElementById("chat-input");
  const chatBox = document.getElementById("chat-box");

  if (input.value.trim() !== "") {
    const message = document.createElement("div");
    message.textContent = input.value;
    chatBox.appendChild(message);
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

function signUp() {
  const username = document.getElementById("username-input").value.trim();
  const password = document.getElementById("password-input").value;

  if (username === "" || password === "") {
    alert("Please enter both username and password.");
    return;
  }

  // Save credentials to local storage
  localStorage.setItem("xnet-username", username);
  localStorage.setItem("xnet-password", password);

  unlockChat(username);
}

function unlockChat(username) {
  document.getElementById("signup-area").style.display = "none";
  document.getElementById("chat-area").style.display = "block";
  document.getElementById("welcome-message").textContent = `Hello, ${username}! Start chatting below.`;
}

// Auto-login if credentials are saved
window.onload = function () {
  const savedUsername = localStorage.getItem("xnet-username");
  const savedPassword = localStorage.getItem("xnet-password");

  if (savedUsername && savedPassword) {
    unlockChat(savedUsername);
  }
};
