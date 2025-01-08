<script>
  import { supabase } from '../../../lib/supabase';
  import { writable } from 'svelte/store';
  import { addRandomPokemonsToOwned } from '../../utils';

  let firstName = writable('');
  let lastName = writable('');
  let email = writable('');
  let username = writable(''); // optional for login
  let password = writable('');

  let errorMessage = writable('');
  let successMessage = writable('');

  const registerUser = async () => {
    errorMessage.set('');
    successMessage.set('');

    const fName = $firstName;
    const lName = $lastName;
    const userEmail = $email;
    const userName = $username;
    const passWord = $password;

    if (!fName || !lName || !userEmail || !userName || !passWord) {
      errorMessage.set('Please fill in all fields');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            first_name: fName,
            last_name: lName,
            email: userEmail,
            username: userName,
            password: passWord,
          },
        ])
        .select('id');

      if (error) throw error;

      const userId = data[0].id;

      // Insert initial coins into the coins table
      const { data: coinsData, error: coinsError } = await supabase
        .from('coins')
        .insert([{ user_id: userId, coin_count: 100 }]); // Default coin count to 100

      if (coinsError) throw coinsError;

      await addRandomPokemonsToOwned(userId);

      successMessage.set('Registration successful!');

      window.location.href = '/index.html'; // Redirect after successful registration
    } catch (error) {
      errorMessage.set(error.message);
    }
  };
</script>

<h1>Register</h1>

<form on:submit|preventDefault={registerUser}>
  <div>
    <label for="first-name">First Name</label>
    <input
      type="text"
      id="first-name"
      bind:value={$firstName}
      placeholder="First Name"
    />
  </div>

  <div>
    <label for="last-name">Last Name</label>
    <input
      type="text"
      id="last-name"
      bind:value={$lastName}
      placeholder="Last Name"
    />
  </div>

  <div>
    <label for="email"
      >&nbsp;&nbsp;&nbsp;Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label
    >
    <input type="email" id="email" bind:value={$email} placeholder="Email" />
  </div>

  <div>
    <label for="username">Username</label>
    <input
      type="text"
      id="username"
      bind:value={$username}
      placeholder="Username"
    />
  </div>

  <div>
    <label for="password">Password</label>
    <input
      type="password"
      id="password"
      bind:value={$password}
      placeholder="Password"
    />
  </div>

  {#if $errorMessage}
    <div class="error">{$errorMessage}</div>
  {/if}

  <button type="submit">Register</button>
</form>

{#if $successMessage}
  <div class="success">{$successMessage}</div>
{/if}

<style>
  h1 {
    margin-top: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: 0 auto;
  }

  input {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  button {
    padding: 0.75rem;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }

  .error {
    color: red;
  }

  .success {
    color: green;
  }
</style>
