const logout = async () => {
    const resp = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (resp.ok) {
      document.location.replace('/');
    } else {
      alert(resp.statusText);
    }
  };
  
  document
  .querySelector('#logout')
  .addEventListener('click', logout);
  