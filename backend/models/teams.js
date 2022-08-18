import { db } from '../db.js';
import { team, player, captains } from '../constants/queries.js';
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

export async function getTeamPlayers(team_id) {
    try { 
        const teamPlayers = await db.query(
            team.getTeamPlayers,
            [team_id]
        );

        return teamPlayers.rows;
    } catch (err) {
        debug(err);
        throw err;
    }
}

export async function deleteTeam(team_id) {
    try {
        const capt = await db.query(
            captains.delete,
            [team_id]
        );
    } catch (err) {
        debug(err);
        throw err;
    }
    
    try {
        const players = await db.query(
            player.deleteByTeam,
            [team_id]
        );
    } catch (err) {
        debug(err);
        throw err;
    }

    try {
        const teams = await db.query(
            team.delete,
            [team_id]
        );
    } catch (err) {
        debug(err);
        throw err;
    }
}

export default {
    createTeam,
    getTeamById,
    getTeamByName,
    getCaptain,
    getTeamPlayers,
    allTeams
};