// Initialize Supabase client
const supabase = createClient(
  'https://your-project-url.supabase.co',
  'your-anon-key-here'
);

// SIGNUP FUNCTION
async function signUp(username, password) {
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

  // Create fake email from username
  const email = `${username}@user.local`;

  // Sign up with fake email + password
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    alert('Signup error: ' + signUpError.message);
    return;
  }

  const user = signUpData.user;

  // Insert profile with real username
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
  const email = `${username}@user.local`;

  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    alert('Login error: ' + loginError.message);
    return;
  }

  // Fetch profile to get username
  const user = loginData.user;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    alert('Could not fetch profile');
    return;
  }

  const usernameFromDB = profile.username;
  alert(`Welcome back, ${usernameFromDB}!`);
}
