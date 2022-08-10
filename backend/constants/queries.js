export const create = {
    team: 'INSERT INTO teams (name, logo_url, city) VALUES ($1, $2, $3) RETURNING *'
};