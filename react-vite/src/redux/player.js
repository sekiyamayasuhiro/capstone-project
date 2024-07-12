import { csrfFetch } from "./csrf";

// action types
const SEARCH_PLAYERS = "player/SEARCH_PLAYERS";
const ERROR_PLAYER = "player/ERROR_PLAYER";

// action creators
const setSearchResults = (searchResults) => ({
    type: SEARCH_PLAYERS,
    payload: searchResults,
});
const playerError = (error) => ({ type: ERROR_PLAYER, payload: error });

// thunks
export const searchPlayers = (query) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/players/search?name=${query}`);
        if (res.ok) {
            const data = await res.json();
            dispatch(setSearchResults(data));
        } else {
            throw new Error("Failed to search players");
        }
    } catch (error) {
        dispatch(playerError(error.message));
    }
};

// reducer
const initialState = {
    searchResults: [],
    error: null,
};

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_PLAYERS:
            return {
                ...state,
                searchResults: action.payload,
                error: null,
            };
        case ERROR_PLAYER:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default playerReducer;
