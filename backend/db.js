import pg from 'pg';
import { schema } from './schema/index.js';
import { db } from './constants/configs.js';

async function initDB() {
    try {
        const pool = new pg.Pool(db);

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