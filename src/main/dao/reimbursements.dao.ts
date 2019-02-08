import { Reimbursement } from '../models/reimbursement';
import { connectionPool } from '../utilities/connection-utilities';
 
  //find by status
  export async function findByStatus(status: number): Promise<Reimbursement[]> {
    const client = await connectionPool.connect();
    try {
      const result = await client.query(
        `SELECT * FROM reimbursement 
        WHERE status = $1
        ORDER BY datesubmitted DESC;`,
        [status]
      );
      if (result.rows) {
        return result.rows;
      }
       else {
        return undefined;
      }
    } finally {
      client.release(); // release connection
    }
  }
  
   //find by user
  export async function findByUser(author: number): Promise<Reimbursement[]> {
    const client = await connectionPool.connect();
    try {
      const result = await client.query(
        `SELECT * FROM reimbursement 
        WHERE author = $1
        ORDER BY datesubmitted DESC;`,
        [author]
      );
      if (result.rows) {
        return result.rows;
      } 
      else {
        return undefined;
      }
    } finally {
      client.release(); // release connection
    }
  }
  

//submit reimbursements 
 export async function submitReim(reimbursement): Promise<Reimbursement> {
  const client = await connectionPool.connect();
  try {
    const result = await client.query(
      `INSERT INTO reimbursement(author, amount, datesubmitted, dateresolved, description, resolver, status, "type") 
      VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $3, $4, 1, $5)
      RETURNING *;`, //figure out what to do with the date resolved: should I make it an empty string? or zero?
      [reimbursement.author, reimbursement.amount, reimbursement.description, reimbursement.resolver, reimbursement.type]
    ); const newSQLreim = result.rows[0]; //I want reimbursement author to = req.params.id
    console.log('In DAO '+ newSQLreim);
    if (newSQLreim) {
      const id = newSQLreim.reimbursementid;
      return {
        ...newSQLreim,
        reimbursementid: id
      };
    } else {
      return undefined;
    } 
  } finally {
    client.release();
  }
}

//------update reimbursements--------
//find reimbursements by id
export async function findById(reimbursementid: number): Promise<Reimbursement> {
  const client = await connectionPool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM reimbursement 
      WHERE reimbursementid = $1;`,
      [reimbursementid]
    );
    const sqlReim = result.rows[0];
    if (sqlReim) {
      return { 
        reimbursementid: sqlReim.reimbursementid,
        author: sqlReim.author,
        amount: sqlReim.amount, 
        datesubmitted: sqlReim.datesubmitted,
        dateresolved: sqlReim.dateresolved,
        description: sqlReim.description,
        resolver: sqlReim.resolver,
        status: sqlReim.status,
        type: sqlReim.type
      };
    } else {
      return undefined;
    }
  } finally {
    client.release(); // release connection
  }
}

//update reimbursement
//try and figure out a way to combine code above with code below--less lines
export async function update(reimbursement): Promise<Reimbursement> {
  const client = await connectionPool.connect();
  try {
    let sql = await findById(reimbursement.reimbursementid);
      console.log('The reimbursement is:\n', sql);
      let newreim = new Reimbursement(); 
      console.log('This is the new reimbursement:' + newreim); //null compare values from postman
        newreim.reimbursementid = sql['reimbursementid'], 
        newreim.author =  reimbursement.author || sql['author'],
        newreim.amount = reimbursement.amount || sql['amount'], 
        newreim.datesubmitted = reimbursement.datesubmitted || sql['datesubmitted'],
        newreim.dateresolved = reimbursement.dateresolved || sql['dateresolved'],
        newreim.description = reimbursement.description || sql['description'],// not null
        newreim.resolver = reimbursement.resolver || sql['resolver'],
        newreim.status = reimbursement.status || sql['status'],
        newreim.type = reimbursement.type || sql['type'],
        console.log('The new reimbursement will be:\n', newreim);
        let result = await client.query(
          `UPDATE reimbursement
          SET  dateresolved = CURRENT_TIMESTAMP, resolver = $2, status = $3, type = $4
          WHERE reimbursementid = $1 RETURNING *;`,
          [newreim.reimbursementid, newreim.resolver, newreim.status, newreim.type]//shouldnt need type. what is resolver? person that resolved the reimbursement?
          )
          if (result.rows[0]) {  
            return result.rows[0];
        } else {
      return undefined;
    } 
  } finally {
    client.release(); // release connection
  }
}
