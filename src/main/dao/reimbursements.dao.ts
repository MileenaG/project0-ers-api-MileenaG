import { Reimbursement } from '../models/reimbursement';
import { connectionPool } from '../utilities/connection-utilities';

//gets all reimbursements--might not need this function
/* export async function allReim(): Promise<reimbursement[]> {
    const client = await connectionPool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM reimbursement;'
      );
      return result.rows.map(sqlReim => {
        let newreim = new reimbursement(); 
        newreim.reimbursementId = sqlReim.reimbursementid, // primary key
	    newreim.author = sqlReim.author,  // foreign key -> User, not null
	    newreim.amount = sqlReim.amount,  // not null
 	    newreim.dateSubmitted = sqlReim.datesubmitted, // not null
 	    newreim.dateResolved = sqlReim.dateresolved, // not null
 	    newreim.description = sqlReim.description, // not null
 	    newreim.resolver = sqlReim.resolver, // foreign key -> User
 	    newreim.status = sqlReim.status, // foreign ey -> ReimbursementStatus, not null
	    newreim.type = sqlReim.type,
        console.log(newreim);
        return newreim;
      });
    } finally {
      client.release(); // release connection
    }
  } */

  
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

/* export async function submitReim(): Promise<reimbursement[]> {
  const client = await connectionPool.connect();
  try {
    const result = await client.query(
      `INSERT INTO reimbursement(author, amount, datesubmitted, dateresolved, description, resolver, status, "type") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
      [author, amount, datesubmitted, dateresolved, description, resolver, status, type]
    );
    const 
  } finally {
    client.release();
  }
 */
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

export async function update(reimbrsement): Promise<Reimbursement> {
  const client = await connectionPool.connect();
  try {
    
    let sql = await findById(reimbrsement.reimbursementid);
      console.log('The reimbursement is:\n', sql);
      let newreim = new Reimbursement(); 
      console.log('This is the new reimbursement:' + newreim); //null compare values from postman
        newreim.reimbursementid = sql['reimbursementid'], 
        newreim.author =  reimbrsement.author || sql['author'],
        newreim.amount = reimbrsement.amount || sql['amount'], 
        newreim.datesubmitted = reimbrsement.datesubmitted || sql['datesubmitted'],
        newreim.dateresolved = reimbrsement.dateresolved || sql['dateresolved'],
        newreim.description = reimbrsement.description || sql['description'],// not null
        newreim.resolver = reimbrsement.resolver || sql['resolver'],
        newreim.status = reimbrsement.status || sql['status'],
        newreim.type = reimbrsement.type || sql['type'],
        console.log('The new reimbursement will be:\n', newreim);
        const result = await client.query(
          `UPDATE reimbursement
          SET  author = $2, amount = $3, datesubmitted = $4, dateresolved = $5, description = $6, resolver = $7, status = $8, type = $9
          WHERE reimbursementid = $1 RETURNING *;`,
          [newreim.reimbursementid, newreim.author, newreim.amount, newreim.datesubmitted, newreim.dateresolved, newreim.description, newreim.resolver, newreim.status, newreim.type])
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
