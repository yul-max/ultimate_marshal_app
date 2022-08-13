export const captains =  `CREATE TABLE IF NOT EXISTS captains (
    team    INT NOT NULL,
    player  INT NOT NULL,
    FOREIGN KEY (team)
        REFERENCES teams (id),
    FOREIGN KEY (player)
        REFERENCES players (id)
)`;