import express from 'express';
import {
    allTeams,
    createTeam
} from '../models/teams.js';
import createDebug from 'debug';

const debug = createDebug('routes:team');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const teams = await allTeams();

        return res.json({
            teams,
            error_message: null
        });
    } catch (err) {
        debug(err.stack);
        return res.status(500).json({
            teams: null,
            error_message: err.stack
        });
    }
});

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
        const teamId = createTeam(name, logo_url, city);

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
            error_message: null
        })
    }
})

export const teamsRouter = router;