import pg from 'pg';
import { schema } from './schema/index.js';

async function initDB() {
    try {
        const pool = new pg.Pool({
            host: 'localhost',
            user: 'admin',
            password: 'admin',
            database: 'ultimarshal',
            port: 5432
        });

        schema.forEach(async (val) => {
            try {
                await pool.query(val);
                console.log('Created table!');
            } catch (err) {
                console.log(err.stack);
            }
        });

        return pool;
    } catch (err) {
        console.log(err);
    }
}

export const db_psql = initDB();