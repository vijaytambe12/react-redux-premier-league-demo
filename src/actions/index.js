import * as ActionConstants from "./ActionConstants";

export const addTeam = (team) => {
    return {
        type: ActionConstants.ADD_TEAM,
        payload: team
    }
};

export const deleteTeam = (id) => {
    return {
        type: ActionConstants.DELETE_TEAM,
        payload: id
    }
}
