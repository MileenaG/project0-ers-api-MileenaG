import { User } from '../models/users';
import { connectionPool } from '../utilities/connection-utilities';

//login
export async function login(username: string , password: string): Promise<User> {
  const client = await connectionPool.connect();
  try {
      let result = await client.query(
      'SELECT * FROM "users" WHERE username = $1 AND "password" = $2;',
      [username, password]
    );
    let resultrows = result.rows[0];
    return resultrows;
  } finally {
    client.release(); // release connection
  }
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
      newuser.email = sqlUser.email // not null
      newuser.role = sqlUser.role,
      console.log(newuser);
      return newuser;
    });
  } finally {
    client.release(); // release connection
  }
}

//find by ID
export async function findById(userid: number): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE userid = $1;',
      [userid]
    );
    const sqlUser = result.rows[0];
    if (sqlUser) {
      return { 
        userid: sqlUser.userid,
        username: sqlUser.username,
        password: '', // don't send back the passwords
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
        newuser.userid = sqlUser['userid'], 
        newuser.username =  user.username || sqlUser['username'],
        newuser.password = '', 
        newuser.firstname = user.firstname || sqlUser['firstname'],
        newuser.lastname = newuser.lastname || sqlUser['lastname'],
        newuser.email = newuser.email || sqlUser['email'],// not null
        newuser.role = newuser.role || sqlUser['role'],
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
