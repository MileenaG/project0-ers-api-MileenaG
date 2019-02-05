export class reimbursement {
 	reimbursementid: number; // primary key
	author: number;  // foreign key -> User, not null
	amount: number;  // not null
 	datesubmitted: number; // not null
 	dateresolved: number; // not null
 	description: string; // not null
 	resolver: number; // foreign key -> User
 	status: number; // foreign ey -> ReimbursementStatus, not null
	type: number // foreign key -> ReimbursementType
}