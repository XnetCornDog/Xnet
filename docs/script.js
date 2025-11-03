const SIGNAL_URL = "https://xnetcorndog.github.io/Xnet/signal.json";

// Create peer
const peer = new SimplePeer({
  initiator: location.hash === "#host",
  trickle: false
});

// Host: show signal and tell user to update signal.json manually
peer.on("signal", data => {
  if (location.hash === "#host") {
    console.log("Copy this signal and paste it into signal.json:");
    console.log(JSON.stringify({ signal: data }));
    alert("Copy the signal from the console and paste it into signal.json on GitHub.");
  }
});

// Peer: fetch signal.json and connect
async function connectToHost() {
  if (location.hash !== "#host") {
    try {
      const res = await fetch(SIGNAL_URL);
      const json = await res.json();
      if (json.signal) {
        peer.signal(json.signal);
      } else {
        alert("No signal found in signal.json yet. Try again in a moment.");
      }
    } catch (err) {
      console.error("Failed to fetch signal.json:", err);
    }
  }
}

connectToHost();

// Chat UI
peer.on("connect", () => {
  console.log("Connected!");
});

peer.on("data", data => {
  const messages = document.getElementById("messages");
  messages.value += "Peer: " + data + "\n";
});

function send() {
  const input = document.getElementById("input");
  peer.send(input.value);
  const messages = document.getElementById("messages");
  messages.value += "You: " + input.value + "\n";
  input.value = "";
}
