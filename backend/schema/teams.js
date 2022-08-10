export const teams =  `CREATE TABLE IF NOT EXISTS teams (
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(255) NOT NULL UNIQUE,
    logo_url  VARCHAR(255) NULL UNIQUE,
    city      VARCHAR(255) NOT NULL
)`;