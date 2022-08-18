import { db } from '../db.js';
import { player, captains } from '../constants/queries.js';
import createDebug from 'debug';

const debug = createDebug('backend:models:players');

export async function createPlayer(team, name, jersey, is_capt) {
    try {
        const player_data = await db.query(
            player.create,
            [team, name, jersey, is_capt]
        );

        return player_data.rows;
    } catch (err) {
        debug(err);
    }
}

export async function setCaptain(team_id, player_id) {
    try {
        const capt = await db.query(
            captains.create,
            [team_id, player_id]
        );
        
        const player_capt = await db.query(
            player.setCaptain,
            [player_id]
        );

        return capt.rows;
    } catch (err) {
        debug(err);
    }
}

export async function updateCaptain(player_id, team_id) {
    try {
        await db.query(
            player.unsetCaptain,
            [team_id]
        );
    } catch (err) {
        debug(err);
    }

    try {
        const capt = await setCaptain(team_id, player_id);
        const capt_update = await db.query(
            captains.update,
            [player_id, team_id]
        );

        return capt_update.rows;
    } catch (err) {
        debug(err);
    }
}

export async function getPlayerByName(name) {
    try {
        const player_data = await db.query(
            player.getByName,
            [name]
        );

        return player_data.rows;
    } catch (err) {
        debug(err);
    }
}

export async function getPlayerByJersey(team, jersey) {
    try {
        const player_data = await db.query(
            player.getByJersey,
            [team, jersey]
        );

        return player_data.rows;
    } catch (err) {
        debug(err);
    }
}