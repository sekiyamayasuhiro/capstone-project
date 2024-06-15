import { csrfFetch } from "./csrf";

// action types
const LOAD_LEAGUES = "LOAD_LEAGUES";
const ADD_LEAGUE = "ADD_LEAGUE";
const UPDATE_LEAGUE = "UPDATE_LEAGUE";
const REMOVE_LEAGUE = "REMOVE_LEAGUE";
const ERROR_LEAGUE = "ERROR_LEAGUE";

// action creators
const loadLeagues = (leagues) => ({ type: LOAD_LEAGUES, payload: leagues });
const addLeague = (league) => ({ type: ADD_LEAGUE, payload: league });
const updateLeague = (league) => ({ type: UPDATE_LEAGUE, payload: league });
const removeLeague = (leagueId) => ({ type: REMOVE_LEAGUE, payload: leagueId });
const errorLeague = (error) => ({ type: ERROR_LEAGUE, payload: error });

// thunks
export const fetchLeagues = () => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/leagues/");
        const data = await res.json();
        if (res.ok) {
            dispatch(loadLeagues(data));
        } else {
            dispatch(errorLeague(data.errors));
        }
    } catch (error) {
        dispatch(errorLeague("Failed to fetch leagues"));
    }
};

export const createLeague = (leagueData) => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/leagues/", {
            method: "POST",
            body: JSON.stringify(leagueData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (res.ok) {
            dispatch(addLeague(data));
        } else {
            dispatch(errorLeague(data.errors));
        }
    } catch (error) {
        dispatch(errorLeague("Failed to create league"));
    }
};

export const updateLeagueDetails =
    (leagueId, leagueData) => async (dispatch) => {
        try {
            const res = await csrfFetch(`/api/leagues/${leagueId}`, {
                method: "PUT",
                body: JSON.stringify(leagueData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(updateLeague(data));
            } else {
                dispatch(errorLeague(data.errors));
            }
        } catch (error) {
            dispatch(errorLeague("Failed to update league"));
        }
    };

export const deleteLeague = (leagueId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/leagues/${leagueId}`, {
            method: "DELETE",
        });
        if (res.ok) {
            dispatch(removeLeague(leagueId));
        } else {
            const data = await res.json();
            dispatch(errorLeague(data.errors));
        }
    } catch (error) {
        dispatch(errorLeague("Failed to delete league"));
    }
};

// reducer
const initialState = {
    leagues: [],
    error: null,
};

const leagueReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LEAGUES:
            return {
                ...state,
                leagues: action.payload,
                error: null,
            };
        case ADD_LEAGUE:
            return {
                ...state,
                leagues: [...state.leagues, action.payload],
                error: null,
            };
        case UPDATE_LEAGUE:
            return {
                ...state,
                leagues: state.leagues.map((league) =>
                    league.id === action.payload.id ? action.payload : league
                ),
                error: null,
            };
        case REMOVE_LEAGUE:
            return {
                ...state,
                leagues: state.leagues.filter(
                    (league) => league.id !== action.payload
                ),
                error: null,
            };
        case ERROR_LEAGUE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default leagueReducer;
