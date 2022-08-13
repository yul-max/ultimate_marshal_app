import express from 'express';
import {
    allTeams,
    createTeam,
    getTeamByName,
} from '../models/teams.js';
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

export const teamsRouter = router;