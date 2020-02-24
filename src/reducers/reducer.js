
import { combineReducers } from 'redux';

const rootReducer = (state = {
    token: {},
    loading: true,
    error: null,
    location: {},
}, action) => {
    switch (action.type) {
        case 'GET_TOKEN':
            return { ...state, token: action.token };
        case 'SAVE_TOKEN':
            return { ...state, token: action.token };
        case 'REMOVE_TOKEN':
            return { ...state, token: action.token };
        case 'LOADING':
            return { ...state, loading: action.isLoading };
        case 'ERROR':
            return { ...state, error: action.error };
        default:
            return state;
    }
};

const locationReducer = (state = {
    location: {},
    loading: true,
    error: null,
}, action) => {
    switch (action.type) {
        case 'GET_LOCATION':
            return { ...state, location: action.location };
        case 'SAVE_LOCATION':
            return { ...state, location: action.location };
        default:
            return state;
    }
};

const boxReducer = (state = {
    box: {},
    loading: true,
    error: null,
}, action) => {
    switch (action.type) {
        case 'GET_BOX':
            return { ...state, box: action.box };
        case 'SAVE_BOX':
            return { ...state, box: action.box };
        case 'REMOVE_BOX':
            return { ...state, box: action.box };
        default:
            return state;
    }
};

const shipReducer = (state = {
    ship: {},
    loading: true,
    error: null,
}, action) => {
    switch (action.type) {
        case 'GET_SHIP':
            return { ...state, ship: action.ship };
        case 'SAVE_SHIP':
            return { ...state, ship: action.ship };
        case 'REMOVE_SHIP':
            return { ...state, ship: action.ship };
        default:
            return state;
    }
};

export default combineReducers({
    token: rootReducer,
    location: locationReducer,
    box: boxReducer,
    ship: shipReducer,
});


