import { Role } from './role';

export class User {
  	userid: number; // primary key
	username: string; // not null, unique
	password: string; // not null
	firstname: string; // not null
	lastname: string; // not null
	email: string; // not null
	role: number;//Role; //number; // not null
} 