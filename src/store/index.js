
import {createStore} from "redux";
import {rootReducer} from "./../reducers/rootReducer"
import masterPlayers from "./../materPlayerData"

const initialState = {
    masterPlayerData : masterPlayers ,
    teams:[]
};

const store = createStore(rootReducer,initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
