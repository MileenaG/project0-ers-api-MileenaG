async function submittedReim(event) {
    event.preventDefault(); // prevent default form submission
    console.log("IM HEREEEEE")
    const author = document.getElementById('inputAuthor').value;
    const amount = document.getElementById('inputAmount').value;
    const description = document.getElementById('inputDes').value;
    const resolver = document.getElementById('inputRes').value;
    const type = document.getElementById('inputType').value;
   
    const credentials = {
      author,
      amount,
      description,
      resolver,
      type
    }

    const res = await fetch('http://localhost:3000/reimbursements', { //this is where they get the user info from 
      method: 'POST',
      body: JSON.stringify(credentials), 
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
  
    if (res.status === 200) { //res status needs to match whats in the router or else it'll always say failed
      window.location = '/reimbursements';
    } else {
      console.log('failed to submit');
      document.getElementById('error-message').innerText = 'failed to submit reimbursement';
    }
  }