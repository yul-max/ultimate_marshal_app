import express from 'express';
import {
    allTeams,
    createTeam,
    getTeamById,
    getTeamByName,
    getTeamPlayers,
    deleteTeam
} from '../models/teams.js';
import {
    updateCaptain
} from '../models/players.js';
import {
    teams_errors
} from '../constants/error_messages.js';
import createDebug from 'debug';

const debug = createDebug('backend:routes:team');

const router = express.Router();

// GET LIST OF ALL TEAMS || GET CERTAIN TEAM
router.get('/', async (req, res) => {
    const { name } = req.query;

    try {
        const teams = name === undefined ? await allTeams() : await getTeamByName(name);

        return res.json({
            teams,
            error_message: null
        });
    } catch (err) {
        debug(err);
        return res.status(500).json({
            teams: null,
            error_message: err.stack
        });
    }
});

// GET LIST OF PLAYERS OF A TEAM
router.get('/:id(\\d+)/players', async (req, res) => {
    const { id } = req.params;

    try {
        const team = await getTeamById(id);

        if (team === undefined) {
            return res.status(404).json({
                players: null,
                error_message: teams_errors.not_exists(id)
            });
        }
    } catch (err) {
        debug(err);
        return res.status(500).json({
            players: null,
            error_message: null,
        });
    }

    try {
        const players = await getTeamPlayers(id);

        return res.json({
            players,
            error_message: null,
        })
    } catch (err) {
        debug(err);
        return res.status(500).json({
            players: null,
            error_message: null
        })
    }
})

// CREATE A NEW TEAM
router.post('/', async (req, res) => {
    const { name, logo_url, city } = req.body;

    if (name === undefined || logo_url === undefined || city === undefined) {
        return res.status(400).json({
            id: null,
            name: null,
            logo_url: null,
            city: null,
            error_message: null,
        });
    }

    try {
        const teamId = await getTeamByName(name);

        if (teamId) {
            return res.status(400).json({
                id: null,
                name: null,
                logo_url: null,
                city: null,
                error_message: teams_errors.exists(name),
            });
        };
    } catch (err) {
        debug(err);
    }

    try {
        const teamId = createTeam(name, logo_url, city);

        debug(`Team ${name} created!`);
        return res.status(201).json({
            id: teamId,
            name,
            logo_url,
            city,
            error_message: null
        })
    } catch (err) {
        debug(err);
        return res.status(500).json({
            id: null,
            name,
            logo_url,
            city,
            error_message: err
        })
    }
})

// UPDATE TEAM CAPTAIN
router.patch('/:id(\\d+)/captain', async (req, res) => {
    const { id } = req.params;
    const { player_id } = req.body;
    
    if (id === undefined || player_id === undefined) {
        return res.status(400).json({
            team_id: null,
            captain_id: null,
            error_message: null,
        })
    }

    try {
        const capt_id = await updateCaptain(player_id, id);

        return res.status(200).json({
            team_id: id,
            captain_id: player_id,
            error_message: null,
        })
    } catch (err) {
        debug(err);
        return res.status(500).json({
            team_id: null,
            captain_id: null,
            error_message: null
        })
    }
});

// DELETE TEAM AND MEMBERS
router.delete('/:id(\\d+)', async (req, res) => {
    const { id } = req.params;

    if (id === undefined) {
        return res.status(400).json({
            team_id: null,
            error_message: null
        });
    }

    try {
        const team = await getTeamById(id);

        if (team === undefined) {
            return res.status(404).json({
                team_id: null,
                error_message: teams_errors.not_exists(id)
            });
        }
    } catch (err) {
        debug(err);
        return res.status(500).json({
            team_id: null,
            error_message: null,
        });
    }

    try {
        const team_id = await deleteTeam(id);

        return res.status(200).json({
            team_id: id,
            error_message: null
        });
    } catch (err) {
        debug(err);
        return res.status(500).json({
            team_id: null,
            error_message: null,
        });
    }
});

export const teamsRouter = router;