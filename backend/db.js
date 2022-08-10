import pg from 'pg';
import { schema } from './schema/index.js';
import { db as conf } from './constants/configs.js';

async function initDB() {
    try {
        const pool = new pg.Pool(conf);

        schema.forEach(async (val) => {
            try {
                await pool.query(val);
                console.log('Created table!');
            } catch (err) {
                console.log(err.stack);
            }
        });

        pool.end();
        return pool;
    } catch (err) {
        console.log(err);
    }
} export const db_psql = initDB();

const pool = new pg.Pool(conf);
export const db = {
    query: (text, params) => {
        return pool.query(text, params);
    },
    getClient: (callback) => {
        pool.connect((err, client, done) => {
            callback(err, client, done);
        });
    }
};