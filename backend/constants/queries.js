export const team = {
    create: 'INSERT INTO teams (name, logo_url, city) VALUES ($1, $2, $3) RETURNING id',
    getByName: 'SELECT * FROM teams WHERE name = $1',
    getById: 'SELECT * FROM teams WHERE id = $1',
    getCaptain: 'SELECT player FROM captains WHERE team = $1',
    all: 'SELECT * FROM TEAMS',
};

export const player = {
    create: 'INSERT INTO players (team, name, jersey, is_capt) VALUES ($1, $2, $3, $4) RETURNING *',
    getByName: 'SELECT * FROM players WHERE name = $1',
    getByJersey: 'SELECT * FROM players WHERE team = $1 AND jersey = $2',
    setCaptain: 'INSERT INTO captains (team, player) VALUES ($1, $2) RETURNING *'
};