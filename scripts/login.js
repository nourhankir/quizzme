function togglePassword() {
  const password = document.getElementById('login-password');
  
  
 
  if (password.type === 'password') {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
      
}
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault(); // stop form from reloading the page

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const msg = document.getElementById('login-msg');

  const users = JSON.parse(localStorage.getItem('users') || '{}');

  // ✅ Admin login
  if (email === "admin@quiz.com" && password === "admin123") {
    msg.textContent = "✅ Welcome, Admin!";
    msg.style.color = "green";
    setTimeout(() => {
      window.location.href = "../pages/dashboard.html"; // adjust if needed
    }, 1000);
    return;
  }

  // ✅ Normal user login
  if (users[email] && users[email] === password) {
    msg.textContent = "✅ Login successful!";
    msg.style.color = "green";

    // Save logged in user
    localStorage.setItem("loggedInUser", email);

    // Redirect after delay
    setTimeout(() => {
      window.location.href = "../pages/quiz.html"; // adjust this path
    }, 1000);
  } else {
    msg.textContent = "❌ Invalid email or password!";
    msg.style.color = "red";
  }
});

