import { User } from '../models/users';
import { connectionPool } from '../utilities/connection-utilities';
import { userInfo } from 'os';

//Here are all of the SQL function 
//find all of the users
export async function findAll(): Promise<User[]> {
  const client = await connectionPool.connect();
  
  
  try {
    const result = await client.query(
      'SELECT * FROM users;'
    );
    return result.rows.map(sqlUser => {
      let newuser = new User(); 
      newuser.userId = sqlUser.userid, //left obj in models, right incoming from DB
      newuser.username = sqlUser.username,
      newuser.password = '', // don't send back the passwords
      newuser.firstName = sqlUser.firstname,
      newuser.lastName =sqlUser.lastname,
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
export async function findById(userId: number): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE userid = $1;',
      [userId]
    );
    const sqlUser = result.rows[0]; // there should only be 1 record
    if (sqlUser) {
      return { //are these the names of the columns in sql
        userId: sqlUser.userId,
        username: sqlUser.username,
        password: '', // don't send back the passwords
        firstName: sqlUser.firstName,
        lastName: sqlUser.lastName,
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

//adding new user into table
export async function save(user: User): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const result = await client.query(
      `INSERT INTO users (username, password, name)
        VALUES  ($1, $2, $3)
        RETURNING userid;`,
      [user.username, user.password, user.firstName, user.lastName, user.email, user.role]
    );
    if (result.rows[0]) {
      const id = result.rows[0].userid;
      return {
        ...user,
        userId: id
      };
    } else {
      return undefined;
    }

  } finally {
    client.release(); // release connection
  }
} 

//getting everything for login function inside user router
export async function login(username: string , password: string): Promise<User[]> {
  const client = await connectionPool.connect();
  
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2;',
      [username, password]
    );
    return result.rows.map(sqlUser => {
      let newuser = new User(); 
      newuser.userId = sqlUser.userid, //left obj in models, right incoming from DB
      newuser.username = sqlUser.username,
      newuser.password = '', // don't send back the passwords
      newuser.firstName = sqlUser.firstname,
      newuser.lastName =sqlUser.lastname,
      newuser.email = sqlUser.email // not null
      newuser.role = sqlUser.role,
      console.log(newuser);
      return newuser;

    });
  } finally {
    client.release(); // release connection
  }
}