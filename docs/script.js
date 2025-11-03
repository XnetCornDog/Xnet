// Create a peer connection
const peer = new SimplePeer({
  initiator: location.hash === "#host", // One person uses #host in the URL
  trickle: false
});

// Show your signal data so you can share it with your peer
peer.on("signal", data => {
  alert("Copy this and send it to your peer:\n\n" + JSON.stringify(data));
});

// When connected, log it
peer.on("connect", () => {
  console.log("Connected to peer!");
});

// When receiving a message, show it in the chat
peer.on("data", data => {
  const messages = document.getElementById("messages");
  messages.value += "Peer: " + data + "\n";
});

// Send a message when the button is clicked
function send() {
  const input = document.getElementById("input");
  peer.send(input.value);
  const messages = document.getElementById("messages");
  messages.value += "You: " + input.value + "\n";
  input.value = "";
}

// Ask for the peer's signal data
const peerSignal = prompt("Paste your peer's signal data:");
if (peerSignal) {
  peer.signal(JSON.parse(peerSignal));
}
