const supabase = supabase.createClient(
  'https://feotfbjqrmuutrinqmr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlb3RmYmpxcm11dXRyaWlucW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NjY3ODMsImV4cCI6MjA3NzI0Mjc4M30.QxwkvQ0wkbzFxvnv0QEcR1Z1cjRZUWZzag3G7j6W7A0'
);

// SIGN UP
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    alert(error.message);
  } else {
    alert('Signup successful! Check your email to confirm.');
  }
});

// LOG IN
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    alert(error.message);
  } else {
    alert('Login successful!');
  }
});

// LOG OUT
document.getElementById('logout-button').addEventListener('click', async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert(error.message);
  } else {
    alert('Logged out!');
  }
});
