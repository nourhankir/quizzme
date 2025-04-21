// Toggle password visibility
function togglePassword() {
    const password = document.getElementById('register-password');
    const confirm = document.getElementById('confirm-password');
    
   
    if (password.type === 'password') {
        password.type = 'text';
      } else {
        password.type = 'password';
      }
    if (confirm.type === 'confirm') {
        confirm.type = 'text';
      } else {
        confirm.type = 'confirm';
      }      
  }
  
  // Handle registration
  const form=document.getElementById('register-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('confirm-password').value;
    const msg = document.getElementById('register-msg');
    
  
    const users = JSON.parse(localStorage.getItem('users') || '{}');
  
    // 1. Check if user already exists
    if (users[email]) {
      msg.textContent = "❌ This email is already registered.";
      msg.style.color = "red";
      return;
    }
  
    // 2. Check if password is already used
    if (Object.values(users).includes(password)) {
      msg.textContent = "❌ This password is already in use. Choose a different one.";
      msg.style.color = "red";
      return;
    }
  
    // 3. Confirm password match
    if (password !== confirm) {
      msg.textContent = "❌ Passwords do not match!";
      msg.style.color = "red";
      return;
    }
  
    // 4. Validate password strength
    const passwordCriteria = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
    if (!passwordCriteria.test(password)) {
      msg.textContent = "❌ Password must be at least 6 characters, include a number and a special character.";
      msg.style.color = "red";
      return;
    }
  
    // 5. Save user to localStorage
    users[email] = password;
    localStorage.setItem('users', JSON.stringify(users));
  
    msg.textContent = "✅ Registered successfully!";
    msg.style.color = "green";
    document.getElementById('register-form').reset();
  });

 