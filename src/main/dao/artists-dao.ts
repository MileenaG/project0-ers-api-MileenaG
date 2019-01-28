import { Artist } from '../models/artist';
import { SessionFactory } from '../util/session-factory';

export class ArtistDao {

    public async getAllArtist(): Promise<Artist[]> {

        let pool = SessionFactory.getConnectionPool();

        const client = await pool.connect();

        const result = await client.query('SELECT * from artist');

        return result.rows;

    }

}