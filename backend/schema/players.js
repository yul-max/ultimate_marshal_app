export const players = `CREATE TABLE IF NOT EXISTS "Players" (
    "id"        INTEGER NOT NULL UNIQUE,
    "team"      INTEGER NOT NULL,
    "name"      TEXT NOT NULL UNIQUE,
    "jersey"    INTEGER NOT NULL,
    PRIMARY KEY("id"),
    FOREIGN KEY("team") REFERENCES Teams("id")
)`;