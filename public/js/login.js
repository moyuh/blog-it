const loginFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (name && password) {
      const resp = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (resp.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(resp.statusText);
      }
    }
  }
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  