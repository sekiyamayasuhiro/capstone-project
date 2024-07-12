import { csrfFetch } from "./csrf";

// action types
const LOAD_TEAMS = "teams/SET_TEAMS";
const ADD_TEAM = "teams/ADD_TEAM";
const UPDATE_TEAM = "teams/UPDATE_TEAM";
const REMOVE_TEAM = "teams/REMOVE_TEAM";
const ERROR_TEAM = "teams/TEAM_ERROR";
// note: added here
const LOAD_TEAM_DETAILS = "teams/LOAD_TEAM_DETAILS";

// action creators
const loadTeams = (teams) => ({ type: LOAD_TEAMS, payload: teams });
const addTeam = (team) => ({ type: ADD_TEAM, payload: team });
const updateTeam = (team) => ({ type: UPDATE_TEAM, payload: team });
const removeTeam = (teamId) => ({ type: REMOVE_TEAM, payload: teamId });
const errorTeam = (error) => ({ type: ERROR_TEAM, payload: error });
// note: added here
const loadTeamDetails = (team) => ({ type: LOAD_TEAM_DETAILS, payload: team });

// thunks
export const fetchTeams = (leagueId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/teams/${leagueId}/teams`);
        const data = await res.json();
        if (res.ok) {
            dispatch(loadTeams(data));
        } else {
            dispatch(errorTeam(data.errors));
        }
    } catch (error) {
        dispatch(errorTeam("Failed to fetch teams"));
    }
};

export const createTeam = (leagueId, teamData) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/teams/${leagueId}/teams`, {
            method: "POST",
            body: JSON.stringify(teamData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (res.ok) {
            dispatch(addTeam(data));
        } else {
            dispatch(errorTeam(data.errors));
        }
    } catch (error) {
        dispatch(errorTeam("Failed to create team"));
    }
};

export const updateTeamDetails =
    (leagueId, teamId, teamData) => async (dispatch) => {
        try {
            const res = await csrfFetch(
                `/api/teams/${leagueId}/teams/${teamId}`,
                {
                    method: "PUT",
                    body: JSON.stringify(teamData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await res.json();
            if (res.ok) {
                dispatch(updateTeam(data));
            } else {
                dispatch(errorTeam(data.errors));
            }
        } catch (error) {
            dispatch(errorTeam("Failed to update team"));
        }
    };

export const deleteTeam = (leagueId, teamId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/teams/${leagueId}/teams/${teamId}`, {
            method: "DELETE",
        });
        if (res.ok) {
            dispatch(removeTeam(teamId));
        } else {
            const data = await res.json();
            dispatch(errorTeam(data.errors));
        }
    } catch (error) {
        dispatch(errorTeam("Failed to delete team"));
    }
};

// note: added here
export const fetchTeamDetails = (leagueId, teamId) => async (dispatch) => {
    try {
        const response = await csrfFetch(
            `/api/teams/${leagueId}/teams/${teamId}`
        );
        if (response.ok) {
            const data = await response.json();
            dispatch(loadTeamDetails(data));
        } else {
            throw new Error("Team fetch failed");
        }
    } catch (error) {
        dispatch(errorTeam(error.message));
    }
};

// reducer
const initialState = {
    teams: [],
    error: null,
};

const teamReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TEAMS:
            return {
                ...state,
                teams: action.payload,
                error: null,
            };
        case ADD_TEAM:
            return {
                ...state,
                teams: [...state.teams, action.payload],
                error: null,
            };
        case UPDATE_TEAM:
            return {
                ...state,
                teams: state.teams.map((team) =>
                    team.id === action.payload.id ? action.payload : team
                ),
                error: null,
            };
        case REMOVE_TEAM:
            return {
                ...state,
                teams: state.teams.filter((team) => team.id !== action.payload),
                error: null,
            };
        case ERROR_TEAM:
            return {
                ...state,
                error: action.payload,
            };
        // note: added here
        case LOAD_TEAM_DETAILS:
            return {
                ...state,
                teams: [
                    ...state.teams.filter(
                        (team) => team.id !== action.payload.id
                    ),
                    action.payload,
                ],
                error: null,
            };
        default:
            return state;
    }
};

export default teamReducer;
