//put search function above fetch
function myFunction() {
    // Declare variables 
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase(); //remove for case sensitive search
    table = document.getElementById("user-table-container");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];//[0] index to specify which column to search
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }
  


// send an http get request to the provided url
fetch("http://localhost:3000/reimbursements/reimbursements", {
  credentials: 'include'
})
  .then(resp => resp.json())
  .then(reimbursements => {
    console.log('In the reimbursemets.js file '+ reimbursements);
    // get the table body
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '';

    reimbursements.forEach(reimbursement => {
      // create a row
      const tr = document.createElement('tr');

      let reimidData = document.createElement('td');
      reimidData.innerText = reimbursement.reimbursementid;
      tr.appendChild(reimidData);

 
      let authorData = document.createElement('td');
      authorData.innerText = reimbursement.author;
      tr.appendChild(authorData);
      
     
      let amountData = document.createElement('td');
      amountData.innerText = reimbursement.amount;
      tr.appendChild(amountData);
      
      let submittedData = document.createElement('td');
      submittedData.innerText = reimbursement.datesubmitted;
      tr.appendChild(submittedData);

      let resolvedData = document.createElement('td');
      resolvedData.innerText = reimbursement.dateresolved;
      tr.appendChild(resolvedData);

      let desData = document.createElement('td');
      desData.innerText = reimbursement.description;
      tr.appendChild(desData);

      let resolverData = document.createElement('td');
      resolverData.innerText = reimbursement.resolver;
      tr.appendChild(resolverData);

      let statusData = document.createElement('td');
      statusData.innerText = reimbursement.status;
      tr.appendChild(statusData);

      let typeData = document.createElement('td');
      typeData.innerText = reimbursement.type;
      tr.appendChild(typeData);


     /*  // add the delete data to the row
      let deleteData = document.createElement('td');
      deleteData.innerText = 'delete';
      deleteData.className = 'delete-button';
      tr.appendChild(deleteData); */

      // add the row to the table body
      tbody.appendChild(tr);
    })

  })
  .catch(console.log);