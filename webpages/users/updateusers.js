console.log('in updateusers.js file');//prints in the browser
async function update(event) {
    event.preventDefault(); // prevent default form submission
    const userid = document.getElementById('inputUserId').value;
    const username = document.getElementById('inputUsername').value;
    //const password = document.getElementById('inputPassword').value;
    const firstname = document.getElementById('inputFirstName').value;
    const lastname = document.getElementById('inputLastName').value;
    const email = document.getElementById('inputEmail').value;
    const role = document.getElementById('inputRole').value;
    
    const credentials = {
      userid,
      username,
      //password, passwords keep coming back blank!
      firstname,
      lastname,
      email,
      role
    }
  
    const res = await fetch('http://localhost:3000/users/users', { //this is where they get the user info from 
      method: 'PATCH',
      body: JSON.stringify(credentials), 
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
  
    if (res.status === 200) {
      window.location = '../users/users.html';
    } else {
      console.log('failed to update');
      document.getElementById('error-message').innerText = 'failed to update';
    }
  } 