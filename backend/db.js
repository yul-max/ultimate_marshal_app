import pg from 'pg';
import { schema } from './schema/index.js';
import { db as conf } from './constants/configs.js';
import createDebug from 'debug';

const debug = createDebug('backend:db');

async function initDB() {
    try {
        const pool = new pg.Pool(conf);

        schema.forEach(async (val) => {
            try {
                await pool.query(val);
            } catch (err) {
                debug(err.stack);
            }
        });

        pool.end();
        return pool;
    } catch (err) {
        debug(err);
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