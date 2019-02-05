import { Reimbursement } from '../models/reimbursement';
import { connectionPool } from '../utilities/connection-utilities';
 
  //find by status
  export async function findByStatus(status: number): Promise<Reimbursement[]> {
    const client = await connectionPool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM reimbursement WHERE status = $1;',
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
        'SELECT * FROM reimbursement WHERE author = $1;', //order by
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
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
      [reimbursement.author, reimbursement.amount, reimbursement.datesubmitted, reimbursement.dateresolved, reimbursement.description, reimbursement.resolver, reimbursement.status, reimbursement.type]
    );
    if (result.rows[0]) {
      const id = result.rows[0].reimbursementid;
      return {
        ...reimbursement,
        id: id
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
      'SELECT * FROM reimbursement WHERE reimbursementid = $1;',
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

//update
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
          SET  author = $2, amount = $3, datesubmitted = $4, dateresolved = $5, description = $6, resolver = $7, status = $8, type = $9
          WHERE reimbursementid = $1 RETURNING *;`,
          [newreim.reimbursementid, newreim.author, newreim.amount, newreim.datesubmitted, newreim.dateresolved, newreim.description, newreim.resolver, newreim.status, newreim.type]
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
