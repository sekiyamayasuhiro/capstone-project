import { csrfFetch } from "./csrf";

// action types
const LOAD_ROSTER = "rosters/LOAD_ROSTER";
const ADD_PLAYER_TO_ROSTER = "rosters/ADD_PLAYER_TO_ROSTER";
const REMOVE_PLAYER_FROM_ROSTER = "rosters/REMOVE_PLAYER_FROM_ROSTER";
const ERROR_ROSTER = "rosters/ERROR_ROSTER";

// action creators
const loadRoster = (roster) => ({ type: LOAD_ROSTER, payload: roster });
const addPlayerToRoster = (player) => ({
    type: ADD_PLAYER_TO_ROSTER,
    payload: player,
});
const removePlayerFromRoster = (playerId) => ({
    type: REMOVE_PLAYER_FROM_ROSTER,
    payload: playerId,
});
const rosterError = (error) => ({ type: ERROR_ROSTER, payload: error });

// thunks
export const fetchRoster = (teamId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/rosters/teams/${teamId}/roster`);
        const data = await res.json();
        if (res.ok) {
            dispatch(loadRoster(data));
        } else {
            dispatch(rosterError(data.error));
        }
    } catch (error) {
        dispatch(rosterError("Failed to fetch roster"));
    }
};

export const addPlayer = (teamId, playerData) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/rosters/teams/${teamId}/roster`, {
            method: "POST",
            body: JSON.stringify(playerData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (res.ok) {
            dispatch(addPlayerToRoster(data.player));
        } else {
            dispatch(rosterError(data.error));
        }
    } catch (error) {
        dispatch(rosterError("Player already on a team in this league."));
    }
};

export const removePlayer = (teamId, playerId) => async (dispatch) => {
    try {
        const res = await csrfFetch(
            `/api/rosters/teams/${teamId}/roster/${playerId}`,
            {
                method: "DELETE",
            }
        );
        if (res.ok) {
            dispatch(removePlayerFromRoster(playerId));
        } else {
            const data = await res.json();
            dispatch(rosterError(data.error));
        }
    } catch (error) {
        dispatch(rosterError("Failed to remove player from roster"));
    }
};

// reducer
const initialState = {
    roster: [],
    error: null,
};

const rosterReducer = (state = initialState, action) => {
    console.log("Action:", action);
    console.log("State before:", state);
    switch (action.type) {
        case LOAD_ROSTER:
            console.log("State after LOAD_ROSTER:", {
                ...state,
                roster: action.payload,
            });
            return {
                ...state,
                roster: action.payload,
                error: null,
            };
        case ADD_PLAYER_TO_ROSTER:
            console.log("State after ADD_PLAYER_TO_ROSTER:", {
                ...state,
                roster: [...state.roster, action.payload],
            });
            return {
                ...state,
                roster: [...state.roster, action.payload],
                error: null,
            };
        case REMOVE_PLAYER_FROM_ROSTER:
            console.log("State after REMOVE_PLAYER_FROM_ROSTER:", {
                ...state,
                roster: state.roster.filter(
                    (player) => player.id !== action.payload
                ),
                error: null,
            });
            return {
                ...state,
                roster: state.roster.filter(
                    (player) => player.id !== action.payload
                ),
                error: null,
            };
        case ERROR_ROSTER:
            console.log("State after ERROR_ROSTER:", {
                ...state,
                error: action.payload,
            });
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default rosterReducer;
