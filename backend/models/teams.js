import { db } from '../db.js';
import { team } from '../constants/queries.js';
import createDebug from 'debug';

const debug = createDebug('models:teams');

export async function getTeam(name) {
    try {
        await db.query(
            team.get,
            [name]
        );
    } catch (err) {
        debug(err.stack);
        console.log(err.stack);
    }
}

export async function allTeams() {
    try {
        const teams = await db.query(
            team.all,
            []
        );

        return teams.rows;
    } catch (err) {
        debug(err.stack);
        console.log(err.stack);
    }
}

export async function createTeam(name, logo_url, city) {
    try {
        const teamId = await db.query(
            team.create,
            [name, logo_url, city]
        );

        return teamId;
    } catch (err) {
        debug(err.stack);
        console.log(err.stack);
    }
};

export default {
    createTeam,
    getTeam,
    allTeams
};