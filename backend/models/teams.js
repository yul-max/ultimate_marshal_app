import { db } from '../db.js';
import { team } from '../constants/queries.js';
import createDebug from 'debug';

const debug = createDebug('backend:models:teams');

export async function getTeamByName(name) {
    try {
        const teamId = await db.query(
            team.getByName,
            [name]
        );

        return teamId.rows[0];
    } catch (err) {
        debug(err);
    }
}

export async function getTeamById(id) {
    try {
        const teamId = await db.query(
            team.getById,
            [id]
        );

        return teamId.rows[0];
    } catch (err) {
        debug(err);
    }
};

export async function allTeams() {
    try {
        const teams = await db.query(
            team.all,
            []
        );
        
        return teams.rows;
    } catch (err) {
        debug(err.stack);
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
        debug(err);
    }
};

export async function getCaptain(team_id) {
    try {
        const teamCapt = await db.query(
            team.getCaptain,
            [team_id]
        );

        return teamCapt.rows;
    } catch (err) {
        debug(err);
    }
};

export default {
    createTeam,
    getTeamById,
    getTeamByName,
    getCaptain,
    allTeams
};