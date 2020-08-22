'use strict'

// Sets of values
const letters = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '-_@#$%^&*()<>/?|[]{}:;№',
}

// Settings for generator
let checks = {
  lowercase: false,
  uppercase: false,
  numbers: false,
  symbols: false,
}

// Function to select random integer
function getRand(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

let checkboxes = document.querySelectorAll('.generator__check');
// Add handlers to checkboxes (to set settings after click)
checkboxes.forEach(checkbox => checkbox.addEventListener('click', () => checkbox.checked ? checks[checkbox.value] = true : checks[checkbox.value] = false));

// Password generator
function pass_generator() {
  // Get text field for password
  const pass = document.querySelector('.generator__password-input');

  // Get password length
  const pass_length = document.querySelector('.generator__password-length').value;
  if (pass_length === 0) {
    alert('Enter password length');
    return false;
  } else if (pass_length > 30) {
    alert('Max password length = 30 symbols');
    return false;
  }

  let password = [];
  let settings = [];
  // Select settings with 'true' value
  for (let setting of Object.keys(checks)) {
    if (checks[setting] == true) settings.push(letters[setting]);
  }
  if (settings.length === 0) {
    alert('Set the settings');
    return false;
  }

  for (let i = 0; i < pass_length; i++) {
    // Select random setting
    let rand_set = settings[getRand(settings.length)];
    // Select random symbol
    let rand_sym = rand_set[getRand(rand_set.length)];
    // Add this symbol to password
    password.push(rand_sym);
  }

  // Print password
  pass.value = password.join('');
}

// Copy password using the button
function copy_pass() {
  let password = document.querySelector('.generator__password-input');
  password.select();
  document.execCommand("copy");
}

// Add handler to button 'generate'
const generate_btn = document.getElementById('gen');
generate_btn.addEventListener('click', pass_generator);

// Add handler to button 'copy'
const copy_btn = document.getElementById('copy');
copy_btn.addEventListener('click', copy_pass);
