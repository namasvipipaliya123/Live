const API = 'http://localhost:8090';

const signupForm = document.getElementById('signupForm');
const otpForm = document.getElementById('otpForm');
const loginForm = document.getElementById('loginForm');
const message = document.getElementById('message');


function showMessage(msg, isError = false) {
  message.style.color = isError ? 'red' : 'green';
  message.textContent = msg;
}

function showForm(formId) {
  [signupForm, otpForm, loginForm].forEach(f => f.classList.add('hidden'));
  document.getElementById(formId).classList.remove('hidden');
}

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    phoneNumber: document.getElementById('phoneNumber').value,
  };

  console.log("Sending signup data:", data); 

  const res = await fetch(`${API}/api/users/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  console.log("Signup response:", result);  

  showMessage(result.message, !res.ok);

  if (res.ok) {
    document.getElementById('otpEmail').value = data.email;
    showForm('otpForm');
  }
});

otpForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    email: document.getElementById('otpEmail').value,
    otp: document.getElementById('otpCode').value
  };

  console.log("Sending OTP verification data:", data);  

  const res = await fetch(`${API}/api/users/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  console.log("OTP verification response:", result); 

  showMessage(result.message, !res.ok);

  if (res.ok) {
    document.getElementById('loginEmail').value = data.email;
    showForm('loginForm');
  }
});


loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    email: document.getElementById('loginEmail').value,
    password: document.getElementById('loginPassword').value,
  };

  console.log("Sending login data:", data);  

  const res = await fetch(`${API}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  console.log("Login response:", result);

  showMessage(result.message, !res.ok);

  if (res.ok && result.token) {
    localStorage.setItem('authToken', result.token);
    showMessage('Login successful!', false);
  }
});
