import express from 'express';
import {
    createPlayer,
    getPlayerByName,
    setCaptain,
    getPlayerByJersey,
} from '../models/players.js';
import {
    getCaptain,
    getTeamById,
} from '../models/teams.js';
import { teams_errors } from '../constants/error_messages.js';
import createDebug from 'debug';

const debug = createDebug('backend:routes:players');

const router = express.Router();

router.get('/', async (req, res) => {
    const { name } = req.query;

    try {
        const player = await getPlayerByName(name);

        return res.json({
            player,
            error_message: null
            });
    } catch (err) {
        debug(err);
        return res.status(500).json({
            player: null,
            error_message: null,
        })
    }
});

router.post('/', async (req, res) => {
    const { team, name, jersey, is_capt } = req.body;
    let teamId;

    if (team === undefined || name === undefined || jersey === undefined || is_capt === undefined) {
        debug('400 Missing data in request body');
        return res.status(400).json({
            id: null,
            team: null,
            name: null,
            jersey: null,
            is_capt: null,
            error_message: null,
        });
    }

    try {
        teamId = await getTeamById(team);

        if (teamId === undefined) {
            debug(`400 ${teams_errors.not_exists(team)}`);
            return res.status(400).json({
                id: null,
                team: null,
                name: null,
                jersey: null,
                is_capt: null,
                error_message: teams_errors.not_exists(team)
            });
        }
    } catch (err) {
        debug(err);
        return res.status(500).json({
            id: null,
            team: null,
            name: null,
            jersey: null,
            is_capt: null,
            error_message: null
        });
    }

    try {
        const jersey_player = await getPlayerByJersey(team, jersey);

        if (jersey_player.length) {
            debug(`400 ${teams_errors.duplicate_jersey(teamId.id, jersey)}`);
            return res.status(400).json({
                id: null,
                team: null,
                name: null,
                jersey: null,
                is_capt: null,
                error_message: teams_errors.duplicate_jersey(teamId.id, jersey)
            });
        }
    } catch (err) {
        debug(err);
        return res.status(500).json({
            id: null,
            team: null,
            name: null,
            jersey: null,
            is_capt: null,
            error_message: null
        })
    }

    if (is_capt) {
        try {
            const teamCapt = await getCaptain(team);

            if (teamCapt.length) {
                try {
                    const team_name = teamId.name;

                    debug(`400 ${teams_errors.has_captain(team_name)}`);

                    return res.status(400).json({
                        id: null,
                        team: null,
                        name: null,
                        jersey: null,
                        is_capt: null,
                        error_message: teams_errors.has_captain(team_name),
                    });
                } catch (err) {
                    debug(err);
                    return res.status(500).json({
                        id: null,
                        team: null,
                        name: null,
                        jersey: null,
                        is_capt: null,
                        error_message: null
                    });
                }
            }
        } catch (err) {
            debug(err);
            return res.status(500).json({
                id: null,
                team: null,
                name: null,
                jersey: null,
                is_capt: null,
                error_message: null
            });
        }
    }

    try {
        const player = await getPlayerByName(name);

        if (player.length) {
            debug(`400 ${teams_errors.duplicate_name(team, name)}`);
            return res.status(400).json({
                id: null,
                team: null,
                name: null,
                jersey: null,
                is_capt: null,
                error_message: teams_errors.duplicate_name(team, name)
            })
        }        
    } catch (err) {
        debug(err);
        return res.status(500).json({
            player: null,
            error_message: null,
        })
    }

    try {
        const player_data = await createPlayer(team, name, jersey, is_capt);

        if (is_capt) {
            try {
                await setCaptain(team, player_data[0].id);
            } catch (err) {
                debug(err);
            }
        }

        debug(`201 Player ${name} for Team ${team} created!`);

        return res.status(201).json({
            id: player_data,
            team,
            name,
            jersey,
            is_capt,
            error_message: null
        });
    } catch (err) {
        debug(err.stack);
        return res.status(500).json({
            id: null,
            team: null,
            name: null,
            jersey: null,
            is_capt: null,
            error_message: null,
        })
    }
});

export const playersRouter = router;