export const team = {
    create: 'INSERT INTO teams (name, logo_url, city) VALUES ($1, $2, $3) RETURNING *',
    get: 'SELECT * FROM teams WHERE name = $1',
    all: 'SELECT * FROM TEAMS',
};