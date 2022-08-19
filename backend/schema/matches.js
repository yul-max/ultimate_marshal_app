export const matches = `CREATE TABLE IF NOT EXISTS matches (
    pitch       INT NOT NULL,
    team_one    INT,
    team_two    INT,
    match_id    INT UNIQUE,
    start_time  TIMESTAMPTZ NOT NULL,
    duration    INTERVAL NOT NULL,
    end_time    TIMESTAMPTZ,
    winner      INT,
    loser       INT,
    FOREIGN KEY (team_one)
        REFERENCES teams (id),
    FOREIGN KEY (team_two)
        REFERENCES teams (id)
)`;