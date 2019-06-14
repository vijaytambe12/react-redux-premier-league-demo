import * as ActionConstants from "./../actions/ActionConstants";

export const mainReducer = (state , action) => {

    switch (action.type) {

        case ActionConstants.ADD_TEAM :
            return {...state , teams: [...state.teams, action.payload]}

        case ActionConstants.DELETE_TEAM :
            return {
                ...state,
                teams: state.teams.filter(item => item.id !== action.payload),
            };

        default:
            return state;
    }

};
