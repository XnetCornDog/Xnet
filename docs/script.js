let peer;
let connected = false;

async function init() {
  const isHost = location.hash === "#host";

  peer = new SimplePeer({
    initiator: isHost,
    trickle: false
  });

  peer.on("signal", data => {
    if (isHost) {
      console.log("Paste this into signal.json:");
      console.log(JSON.stringify({ signal: data }));
    }
  });

  peer.on("connect", () => {
    connected = true;
    console.log("Connected!");
  });

  peer.on("data", data => {
    const messages = document.getElementById("messages");
    messages.value += "Peer: " + data + "\n";
  });

  if (!isHost) {
    try {
      const res = await fetch("signal.json");
      const { signal } = await res.json();
      peer.signal(signal);
    } catch (err) {
      console.error("Failed to load signal.json", err);
    }
  }
}

function send() {
  const input = document.getElementById("input");
  const messages = document.getElementById("messages");

  if (peer && connected) {
    peer.send(input.value);
    messages.value += "You: " + input.value + "\n";
    input.value = "";
  } else {
    messages.value += "⚠️ Not connected yet.\n";
  }
}

init();
