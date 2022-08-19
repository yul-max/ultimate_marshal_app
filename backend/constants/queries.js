export const player = {
    create: 'INSERT INTO players (team, name, jersey, is_capt) VALUES ($1, $2, $3, $4) RETURNING *',
    getByName: 'SELECT * FROM players WHERE name = $1',
    getByJersey: 'SELECT * FROM players WHERE team = $1 AND jersey = $2',
    getById: 'SELECT * FROM players WHERE id = $1',
    unsetCaptain: 'UPDATE players SET is_capt = false WHERE team = $1 AND is_capt = true',
    setCaptain: 'UPDATE players SET is_capt = true WHERE id = $1 AND is_capt = false',
    deleteByTeam: 'DELETE FROM players WHERE team = $1'
};

export const team = {
    create: 'INSERT INTO teams (name, logo_url, city) VALUES ($1, $2, $3) RETURNING *',
    getByName: 'SELECT * FROM teams WHERE name = $1',
    getById: 'SELECT * FROM teams WHERE id = $1',
    getPlayerByName: `${player.getByName} AND TEAM = $2`,
    getCaptain: 'SELECT player FROM captains WHERE team = $1',
    getTeamPlayers: 'SELECT * FROM players WHERE team =$1 ORDER BY is_capt DESC',
    all: 'SELECT * FROM teams',
    delete: 'DELETE FROM teams WHERE id = $1'
};

export const captains = {
    create: 'INSERT INTO captains (team, player) VALUES ($1, $2) RETURNING *',
    update: 'UPDATE captains SET player = $1 WHERE team = $2',
    delete: 'DELETE FROM captains WHERE team = $1'
}