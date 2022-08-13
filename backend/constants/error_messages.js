export const teams_errors = {
    'exists': (name) => {
        return `Team ${name} already exists.`
    },
    'not_exists': (id) => {
        return `Team ${id} does not exist.`
    },
    'has_captain': (team) => {
        return `Team ${team} already has a captain.`
    }
};