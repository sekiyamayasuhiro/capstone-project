import { csrfFetch } from "./csrf";

// action types
const LOAD_PLAYERS = "players/LOAD_PLAYERS";
const ADD_PLAYER_TO_ROSTER = "players/ADD_PLAYER_TO_ROSTER";
const ERROR_PLAYER = "players/PLAYER_ERROR";

// action creators
const loadPlayers = (players) => ({ type: LOAD_PLAYERS, payload: players });
const addPlayerToRoster = (player) => ({
    type: ADD_PLAYER_TO_ROSTER,
    payload: player,
});
const errorPlayer = (error) => ({ type: ERROR_PLAYER, payload: error });

// Thunk to fetch players based on name
export const fetchPlayers = (name) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/players/search?name=${name}`);
        const data = await res.json();
        if (res.ok) {
            dispatch(loadPlayers(data));
        } else {
            dispatch(errorPlayer(data.errors));
        }
    } catch (error) {
        dispatch(errorPlayer("Failed to fetch players"));
    }
};

export const addPlayerToTeamRoster = (teamId, playerId) => async (dispatch) => {
    console.log(`/api/rosters/teams/${teamId}/roster`);

    try {
        const res = await csrfFetch(`/api/rosters/teams/${teamId}/roster`, {
            method: "POST",
            body: JSON.stringify({ player_id: playerId }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        if (res.ok) {
            dispatch(addPlayerToRoster(data));
        } else {
            dispatch(errorPlayer(data.errors));
        }
    } catch (error) {
        dispatch(errorPlayer("Failed to add player to roster"));
    }
};

// Reducer
const initialState = {
    players: [],
    error: null,
};

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PLAYERS:
            return {
                ...state,
                players: action.payload,
                error: null,
            };
        case ADD_PLAYER_TO_ROSTER:
            return {
                ...state,
                players: [...state.players, action.payload],
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
