import sqlite3  from 'sqlite3';
import { open } from 'sqlite';
import { schema } from './schema/index.js';

let filename = './cfda.db';

async function initDB() {
    try {
        const db = await open({
            filename,
            driver: sqlite3.cached.Database,
        });

        console.log('Connected to the tables DB');
        schema.forEach(async (val) => {
            try {
                db.run(val);
            } catch (err) {
                console.log('Error creating table');
                console.log(err);
            }
        });

        return db;
    } catch (err) {
        console.log('Error connecting to database');
        console.log(err);
    }
};

export const db = initDB();