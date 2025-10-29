// script.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://feotfbjqrmuutriinqmr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlb3RmYmpxcm11dXRyaWlucW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NjY3ODMsImV4cCI6MjA3NzI0Mjc4M30.QxwkvQ0wkbzFxvnv0QEcR1Z1cjRZUWZzag3G7j6W7A0'
);

// SIGNUP FUNCTION
export async function signUp(username, password) {
  const { data: existingUser, error: checkError } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .single();

  if (existingUser) {
    alert('Username is already taken');
    return;
  }

  const email = `${username}@user.local`;

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    alert('Signup error: ' + signUpError.message);
    return;
  }

  const user = signUpData.user;

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
export async function logIn(username, password) {
  const email = `${username}@user.local`;

  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    alert('Login error: ' + loginError.message);
    return;
  }

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
