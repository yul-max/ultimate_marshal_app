import { db } from '../db';
import { create } from '../constants/queries';

async function createTeam(name, logo_url, city) {
    try {
        await db.query(
            create.team,
            [name, logo_url, city]
        );
    } catch (err) {
        console.log(err.stack);
    }
};