/* tslint:disable */
import axios from 'axios';

import {REQUEST, SUCCESS, FAILURE} from './action-type.util';
import {API_ROOT} from "../shared/util/api-config";

export const ACTION_TYPES = {
    GET_SYNONYMS: 'synonyms/GET_SYNONYMS',
    ADD_SYNONYMS: 'synonyms/ADD_SYNONYMS',
    DELETE_SYNONYMS: 'synonyms/DELETE_SYNONYMS'
};

const initialState = {
    loading: false,
    errorMessage: null,
    synonyms: []
};

// Reducer

export default (state = initialState, action) => {
    switch (action.type) {

        case REQUEST(ACTION_TYPES.GET_SYNONYMS):
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case FAILURE(ACTION_TYPES.GET_SYNONYMS):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.GET_SYNONYMS):
            return {
                ...state,
                loading: false,
                synonyms: action.payload.data
            };
        case REQUEST(ACTION_TYPES.ADD_SYNONYMS):
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case FAILURE(ACTION_TYPES.ADD_SYNONYMS):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.ADD_SYNONYMS):
            return {
                ...state,
                loading: false,
                synonyms: action.payload.data
            };
        case REQUEST(ACTION_TYPES.DELETE_SYNONYMS):
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case FAILURE(ACTION_TYPES.DELETE_SYNONYMS):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.DELETE_SYNONYMS):
            return {
                ...state,
                loading: false,
                synonyms: action.payload.data
            };
        default:
            return state;
    }
};

export const getSynonyms = (type) => ({
    type: ACTION_TYPES.GET_SYNONYMS,
    payload: axios.get(`${API_ROOT}/api/synonyms/${type}`)
});

export const addSynonyms = (synonyms, type) => ({
    type: ACTION_TYPES.ADD_SYNONYMS,
    payload: axios.post(`${API_ROOT}/api/synonyms`, {synonyms, type})
});

export const deleteSynonyms = (id) => ({
    type: ACTION_TYPES.DELETE_SYNONYMS,
    payload: axios.delete(`${API_ROOT}/api/synonyms/${id}`)
});

