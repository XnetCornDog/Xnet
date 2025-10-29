// Initialize Supabase client
const supabase = createClient('https://your-project-url.supabase.co', 'your-anon-key');

// SIGNUP FUNCTION
async function signUp(email, password, username) {
  // Check if username is taken
  const { data: existingUser, error: checkError } = await supabase
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
async function logIn(username, password) {
  // Look up email by username
  const { data: profile, error: lookupError } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .single();

  if (!profile) {
    alert('Username not found');
    return;
  }

  const userId = profile.id;

  // Log in with email (assuming email = userId + "@example.com")
  const email = `${userId}@example.com`;

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
