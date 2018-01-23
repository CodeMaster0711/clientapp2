/* tslint:disable */
import axios from 'axios';

import {REQUEST, SUCCESS, FAILURE} from './action-type.util';
import {API_ROOT} from "../shared/util/api-config";

export const ACTION_TYPES = {
    GET_REDIRECTS: 'redirects/GET_REDIRECTS',
    ADD_REDIRECT: 'redirects/ADD_REDIRECT',
    DELETE_REDIRECT: 'redirects/DELETE_REDIRECT'
};

const initialState = {
    loading: false,
    errorMessage: null,
    redirects: []
};

// Reducer

export default (state = initialState, action) => {
    switch (action.type) {

        case REQUEST(ACTION_TYPES.GET_REDIRECTS):
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case FAILURE(ACTION_TYPES.GET_REDIRECTS):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.GET_REDIRECTS):
            return {
                ...state,
                loading: false,
                redirects: action.payload.data
            };
        case REQUEST(ACTION_TYPES.ADD_REDIRECT):
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case FAILURE(ACTION_TYPES.ADD_REDIRECT):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.ADD_REDIRECT):
            return {
                ...state,
                loading: false,
                redirects: action.payload.data
            };
        case REQUEST(ACTION_TYPES.DELETE_REDIRECT):
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case FAILURE(ACTION_TYPES.DELETE_REDIRECT):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.DELETE_REDIRECT):
            return {
                ...state,
                loading: false,
                redirects: action.payload.data
            };
        default:
            return state;
    }
};

export const getRedirects = () => ({
    type: ACTION_TYPES.GET_REDIRECTS,
    payload: axios.get(`${API_ROOT}/api/redirect`)
});

export const addRedirect = (keyword, url) => ({
    type: ACTION_TYPES.ADD_REDIRECT,
    payload: axios.post(`${API_ROOT}/api/redirect`, {keyword, url})
});

export const deleteRedirect = (id) => ({
    type: ACTION_TYPES.DELETE_REDIRECT,
    payload: axios.delete(`${API_ROOT}/api/redirect/${id}`)
});

