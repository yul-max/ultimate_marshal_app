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
    },
    'duplicate_name': (team, name) => {
        return `Team ${team} already has a player named ${name}.`
    },
    'not_a_member': (team, player) => {
        return `Player ${player} is not a member of Team ${team}.`
    }
};