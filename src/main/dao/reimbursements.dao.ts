import { reimbursement } from '../models/reimbrsement';
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
  export async function findByStatus(status: number): Promise<reimbursement[]> {
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
  export async function findByUser(author: number): Promise<reimbursement[]> {
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


//update reimbursements

