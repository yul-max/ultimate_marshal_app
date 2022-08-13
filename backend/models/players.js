import { db } from '../db.js';
import { player } from '../constants/queries.js';
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
            player.setCaptain,
            [team_id, player_id]
        );

        return capt.rows;
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