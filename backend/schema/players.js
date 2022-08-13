export const players = `CREATE TABLE IF NOT EXISTS players(
    id      SERIAL PRIMARY KEY,
    team    INT NOT NULL,
    name    VARCHAR(255) NOT NULL UNIQUE,
    jersey  VARCHAR(10) NOT NULL,
    is_capt BOOLEAN NOT NULL,    
    FOREIGN KEY (team)
        REFERENCES teams (id)
)`;