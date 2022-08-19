import express from 'express';
import {
    templateMatch
} from '../models/matches.js';
import { teams_errors } from '../constants/error_messages.js';
import createDebug from 'debug';

const debug = createDebug('backend:routes:matches');

const router = express.Router();

router.get('/', async (req, res) => {
    return res.json({
        error_messages: null
    });
});

router.post('/template', async (req, res) => {
    const { pitch, start, duration } = req.body;

    try {
        const match_template = await templateMatch(pitch, start, duration);
        const { end_time, start_time } = match_template;
        return res.status(201).json({
            pitch,
            team_one: null,
            team_two: null,
            start_time,
            duration,
            end_time,
            winner: null,
            loser: null
        });
    } catch (err) {
        debug(err);
        return res.status(500).json({
            team_one: null,
            team_two: null,
            start_time: null,
            duration: null,
            end_time: null,
            winner: null,
            loser: null
        })
    }
})

export const matchesRouter = router;