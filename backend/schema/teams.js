export const teams =  `CREATE TABLE IF NOT EXISTS "Teams" (
    "id"        INTEGER NOT NULL UNIQUE,
    "name"      TEXT NOT NULL UNIQUE,
    "logo_url"  TEXT NOT NULL UNIQUE,
    "captain"   INTEGER NOT NULL,
    "city"      TEXT NOT NULL,
    PRIMARY KEY("id")
)`;