async function update(event) {
    event.preventDefault(); // prevent default form submission
    const reimbursementid = document.getElementById('inputReimId').value;
    //const resolver = document.getElementById('inputResolver').value;
    const status = document.getElementById('inputStatus').value;
    const type = document.getElementById('inputType').value;
    
    const credentials = {
      reimbursementid,
      //resolver,
      status,
      type
    }
  
    const res = await fetch('http://localhost:3000/reimbursements/reimbursements', { //this is where they get the user info from 
      method: 'PATCH',
      body: JSON.stringify(credentials), 
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
  
    if (res.status === 200) { //res status needs to match whats in the router or else it'll always say failed
      window.location = '../reimbursements/reimbursements.html';
    } else {
      console.log('failed to update');
      document.getElementById('error-message').innerText = 'failed to update';
    }
  } 