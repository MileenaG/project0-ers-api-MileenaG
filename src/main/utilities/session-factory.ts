//delete this one once connected to AWS in connection-utilties file


//configures session and allows us to connect to the database
import { Pool } from 'pg';

export class SessionFactory { 

	static cred = {
		database: 'mydb_projects', //process.env.PostgreSQLDB,
		host: 'mydb-projects.csxl7thwzvqy.us-east-2.rds.amazonaws.com',//process.env.PostgreSQLEndpoint,
		user: 'mileena',//process.env.PostgreSQLUser,
		password: 'stella17' ,//process.env.PostgreSQLPassword,
		max: 10, //number of connections allowed

	}

	static pool: Pool;

	static created = false;

	static getConnectionPool(): Pool{

		if(!this.created){
			this.pool = new Pool(this.cred);
			this.created = true;
		}

		return this.pool
	}
}