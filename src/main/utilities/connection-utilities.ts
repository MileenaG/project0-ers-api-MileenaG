import { Pool } from 'pg';


export const connectionPool = new Pool({
  user: process.env.HOME_DB_USER, //AWS_DB_USER,
  host: process.env.HOME_DB_HOST, //AWS_DB_HOST,
  database: process.env.HOME_DB, //AWS_DB,
  password: process.env.HOME_DB_PSSWD, //AWS_DB_PSSWD,
  port: 5432,
  max: 3 // max number of connections
});
connectionPool.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
