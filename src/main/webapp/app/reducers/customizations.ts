/* tslint:disable */
import axios from 'axios';
import {REQUEST, SUCCESS, FAILURE} from './action-type.util';
import {API_ROOT} from "../shared/util/api-config";


export const ACTION_TYPES = {
    GET_CUSTOMIZATIONS: 'redirects/GET_CUSTOMIZATIONS',
    SAVE_CUSTOMIZATIONS: 'redirects/SAVE_CUSTOMIZATIONS',
    GET_SEARCH_RESULT_CUSTOMIZATIONS: 'redirects/GET_SEARCH_RESULT_CUSTOMIZATIONS',
    SAVE_SEARCH_RESULT_CUSTOMIZATIONS: 'redirects/SAVE_SEARCH_RESULT_CUSTOMIZATIONS',
};

const initialState = {
    loading: false,
    errorMessage: null,
    customizations: [],
    searchResultCustomizations: []
};

// Reducer

export default (state = initialState, action) => {

    switch (action.type) {

        case REQUEST(ACTION_TYPES.GET_CUSTOMIZATIONS):
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case FAILURE(ACTION_TYPES.GET_CUSTOMIZATIONS):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.GET_CUSTOMIZATIONS):
            return {
                ...state,
                loading: false,
                customizations: action.payload.data
            };
        case REQUEST(ACTION_TYPES.GET_SEARCH_RESULT_CUSTOMIZATIONS):
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case FAILURE(ACTION_TYPES.GET_SEARCH_RESULT_CUSTOMIZATIONS):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.GET_SEARCH_RESULT_CUSTOMIZATIONS):
            return {
                ...state,
                loading: false,
                searchResultCustomizations: action.payload.data
            };
        default:
            return state;
    }
};

export const getCustomizations = () => ({
    type: ACTION_TYPES.GET_CUSTOMIZATIONS,
    payload: axios.get(`${API_ROOT}/api/search-style-compile/AUTOCOMPLETE`)
});


export const saveCustomizations = (customizations) => ({
    type: ACTION_TYPES.SAVE_CUSTOMIZATIONS,
    payload: axios.post(`${API_ROOT}/api/search-style-compile`, customizations)
});


export const getSearchResultsCustomizations = () => ({
    type: ACTION_TYPES.GET_SEARCH_RESULT_CUSTOMIZATIONS,
    payload: axios.get(`${API_ROOT}/api/search-style-compile/SEARCH_RESULT`)
});


export const saveSearchResultsCustomizations = (customizations) => ({
    type: ACTION_TYPES.SAVE_SEARCH_RESULT_CUSTOMIZATIONS,
    payload: axios.post(`${API_ROOT}/api/search-style-compile`, customizations)
});

/*export const saveCustomization = (id, color) => ({
    type: ACTION_TYPES.SAVE_CUSTOMIZATIONS,
    --------payload: axios.post(`${API_ROOT}/api/sass-compile`)
});*/

