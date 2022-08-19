import { db } from '../db.js';
import { matches, team } from '../constants/queries.js';
import { end_date } from '../middleware/dateware.js';
import createDebug from 'debug';

const debug = createDebug('backend:models:matches');

export async function templateMatch(pitch, start_time, duration) {
    const end_time = end_date(start_time, duration);
    end_time.replace('.000Z', '+08:00');
    try {
        const match_template = await db.query(
            matches.template,
            [pitch, start_time, duration, end_time]
        );

        return match_template.rows[0];
    } catch (err) {
        debug(err);
        throw err;
    }
}