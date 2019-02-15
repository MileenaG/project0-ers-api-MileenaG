//Search bar
function myFunction() {
  // Declare variables 
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase(); //remove for case sensitive search
  table = document.getElementById("users-table-container");
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

//users table
// send an http get request to the provided url
fetch("http://localhost:3000/users/users", {
  credentials: 'include'
})
  .then(resp => resp.json())
  .then(users => {
    console.log('In the users.js file '+ users);
    // get the table body
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '';

    // for each user retreived from the db
    users.forEach(user => {

      // create a row
      const tr = document.createElement('tr');

      let useridData = document.createElement('td');
      useridData.innerText = user.userid;
      tr.appendChild(useridData);

      // add the username data to the row
      let usernameData = document.createElement('td');
      usernameData.innerText = user.username;
      tr.appendChild(usernameData);
      
      // add the first name data to the row
      let firstnameData = document.createElement('td');
      firstnameData.innerText = user.firstname;
      tr.appendChild(firstnameData);
      
      let lastnameData = document.createElement('td');
      lastnameData.innerText = user.lastname;
      tr.appendChild(lastnameData);

      let emailData = document.createElement('td');
      emailData.innerText = user.email;
      tr.appendChild(emailData);

      let roleData = document.createElement('td');
      roleData.innerText = user.role;
      tr.appendChild(roleData);


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