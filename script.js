const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_KEY = 'YOUR_ANON_KEY';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let currentUser = null;

// Sign up
async function signUp() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const hash = btoa(password); // Simple hash (not secure for real apps)

  const { data, error } = await supabase
    .from('users')
    .insert([{ username, password_hash: hash }]);

  if (error) {
    alert('Signup failed: ' + error.message);
  } else {
    currentUser = username;
    document.getElementById('login').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
    loadMessages();
    subscribeToMessages();
  }
}

// Log in
async function logIn() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const hash = btoa(password);

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .eq('password_hash', hash)
    .single();

  if (error || !data) {
    alert('Login failed');
  } else {
    currentUser = username;
    document.getElementById('login').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
    loadMessages();
    subscribeToMessages();
  }
}

// Send message
async function sendMessage() {
  const content = document.getElementById('messageInput').value;
  await supabase.from('messages').insert([
    { user: currentUser, text: content }
  ]);
  document.getElementById('messageInput').value = '';
}

// Load messages
async function loadMessages() {
  const { data } = await supabase
    .from('messages')
    .select('*')
    .order('inserted_at', { ascending: true });

  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = '';
  data.forEach(msg => {
    const div = document.createElement('div');
    div.textContent = `${msg.user}: ${msg.text}`;
    messagesDiv.appendChild(div);
  });
}

// Real-time updates
function subscribeToMessages() {
  supabase
    .channel('public:messages')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
      const msg = payload.new;
      const div = document.createElement('div');
      div.textContent = `${msg.user}: ${msg.text}`;
      document.getElementById('messages').appendChild(div);
    })
    .subscribe();
}
