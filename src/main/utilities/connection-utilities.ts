import { Pool } from 'pg';


export const connectionPool = new Pool({
  user: process.env.HOME_DB_USER,
  host: process.env.HOME_DB_HOST, //|| localhost,
  database: process.env.HOME_DB,
  password: process.env.HOME_DB_PSSWD,
  port: 5432,
  max: 3 // max number of connections
});
connectionPool.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
