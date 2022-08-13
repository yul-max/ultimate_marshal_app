export const teams_errors = {
    'exists': (name) => {
        return `Team ${name} already exists.`
    },
    'not_exists': (id) => {
        return `Team ${id} does not exist.`
    },
    'has_captain': (team) => {
        return `Team ${team} already has a captain.`
    },
    'duplicate_jersey': (team, jersey) => {
        return `Team ${team} already has a player with jersey number ${jersey}.`
    }
};