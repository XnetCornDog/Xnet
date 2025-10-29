// Initialize Supabase client
const supabase = createClient(
  'https://your-project-url.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4cWZzZ3ZzZ3ZzZ3ZzZ3ZzZ3ZzZ3ZzZ3ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYwMDAwMDAsImV4cCI6MjAwMTU3NjAwMH0.abc123xyz456youractualkeyhere'
);

// SIGNUP FUNCTION
async function signUp(email, password, username) {
  // Check if username is taken
  const { data: existingUser } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .single();

  if (existingUser) {
    alert('Username is already taken');
    return;
  }

  // Sign up with email + password
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    alert('Signup error: ' + signUpError.message);
    return;
  }

  const user = signUpData.user;

  // Insert profile with username
  const { error: insertError } = await supabase.from('profiles').insert({
    id: user.id,
    username,
  });

  if (insertError) {
    alert('Profile insert error: ' + insertError.message);
    return;
  }

  alert('Signup successful!');
}

// LOGIN FUNCTION
async function logIn(email, password) {
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    alert('Login error: ' + loginError.message);
    return;
  }

  alert('Login successful!');
}
