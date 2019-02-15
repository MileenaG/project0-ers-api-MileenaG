import { User } from '../models/users';
import { connectionPool } from '../utilities/connection-utilities';
import { Role } from '../models/role';

//login
export async function login(username: string , password: string): Promise<User> {
  const client = await connectionPool.connect();
    console.log("im at the login daos this is the " + username+ "hi")
  try {
    let result = await client.query(
      'SELECT * FROM "users" WHERE username = $1 AND "password" = $2 ;',
      [username, password]
      );
      let resultrows = result.rows[0];
      
      //result.rows is undefined and not returning anything
      
      
      
      return resultrows;
      
    } finally {
      console.log("done")
      client.release(); // release connection
    }

    console.log("this is login")
  }
  
  //find all users
  export async function findAll(): Promise<User[]> {
    const client = await connectionPool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM users;'
        );
        return result.rows.map(sqlUser => {
          let newuser = new User(); 
          newuser.userid = sqlUser.userid, //left obj in models, right incoming from DB
          newuser.username = sqlUser.username,
          newuser.password = '', // don't send back the passwords
          newuser.firstname = sqlUser.firstname,
          newuser.lastname =sqlUser.lastname,
          newuser.email = sqlUser.email, // not null
          newuser.role = sqlUser.role
        
          return newuser;
        });
      } finally {
        client.release(); // release connection
      }
    }
    
    //find by ID
    export async function findById(userid: number): Promise<User> {
      console.log('role in dao: '+Role);

        
          const client = await connectionPool.connect();
      try {
        const result = await client.query(
      'SELECT * FROM users WHERE userid = $1;', //I could use joins!! for role
      [userid]
    );
    const sqlUser = result.rows[0];
    if (sqlUser) {
      return { 
        userid: sqlUser.userid,
        username: sqlUser.username,
        password: '',
        firstname: sqlUser.firstname,
        lastname: sqlUser.lastname,
        email: sqlUser.email,
        role: sqlUser.role
      };
    } else {
      return undefined;
    }
  } finally {
    client.release(); // release connection
  }
}

//update user
export async function update(user): Promise<User> {
  const client = await connectionPool.connect();
  try {
    
    let sqlUser = await findById(user.userid);
      console.log('The user is:\n', sqlUser);
      let newuser = new User(); 
      console.log('This is the new user ' + newuser);
        newuser.userid = sqlUser['userid'], 

        console.log( newuser.userid)
        newuser.username =  user.username || sqlUser['username'],
        newuser.password = sqlUser['password'], //fix this part! password goes back to sql as empty
        newuser.firstname = user.firstname || sqlUser['firstname'],
        newuser.lastname = user.lastname || sqlUser['lastname'],
        newuser.email = user.email || sqlUser['email'],// not null
        newuser.role = parseInt(user.role) || sqlUser['role'], //Need this so it knows what "text" submitted in the form is a number not a string
        console.log('The new user will be:\n', newuser);
        const result = await client.query(
          `UPDATE users
          SET username = $2, "password" = $3, firstname = $4, lastname = $5, email = $6, "role" = $7
          WHERE userid = $1 RETURNING *;`,
          [newuser.userid, newuser.username, newuser.password, newuser.firstname, newuser.lastname, newuser.email, newuser.role])
          if (result.rows[0]) {  
            
            return result.rows[0];
        }
    else {
      return undefined;
    }
  } finally {
    client.release(); // release connection
  }
} 
