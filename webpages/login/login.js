async function login(event) {
    event.preventDefault(); // prevent default form submission
    const username = document.getElementById('inputUsername').value;
    const password = document.getElementById('inputPassword').value;
    
    const credentials = {
      username, // username: value of the variable
      password
    }
  
    const res = await fetch('http://localhost:3000/login', { //this is where they get the user info from 
      method: 'POST',
      body: JSON.stringify(credentials), //blocked by CORS 
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
  
    if (res.status === 200) {
      window.location = '../users/users.html'; //WTF where is this?? is this telling it where to go after a successful login?
    } else {
      console.log('failed to login');
      document.getElementById('inputPassword').value = '';
      document.getElementById('error-message').innerText = 'failed to login';
    }
  } 

