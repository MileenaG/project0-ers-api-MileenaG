import { role } from './role';

export class users {
  	userId: number; // primary key
	username: string; // not null, unique
	password: string; // not null
	firstName: string; // not null
	lastName: string; // not null
	email: string; // not null
	role: role // not null
}