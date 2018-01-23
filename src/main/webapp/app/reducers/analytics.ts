/* tslint:disable */
import axios from 'axios';

import {REQUEST, SUCCESS, FAILURE} from './action-type.util';
import {API_ROOT} from "../shared/util/api-config";

export const ACTION_TYPES = {
    GET_PRODUCT_CLICKS_COUNT: 'analytics/GET_PRODUCT_CLICKS_COUNT',
    GET_REDIRECT_URLS_COUNT: 'analytics/GET_REDIRECT_URLS_COUNT',
    GET_SEARCHED_QUERIES_COUNT: 'analytics/GET_SEARCHED_QUERIES_COUNT',
    GET_SEARCHED_PHRASES_STATS: 'analytics/GET_SEARCHED_PHRASES_STATS',
    GET_NO_PRODUCT_FOUND_STATS: 'analytics/GET_NO_PRODUCT_FOUND_STATS',
    GET_PRODUCT_CLICK_STATS: 'analytics/GET_PRODUCT_CLICK_STATS'
};

const initialState = {
    loading: false,
    errorMessage: null,
    productClicksCount: null,
    redirectUrlsCount: null,
    searchedQueriesCount: null,
    searchedPhrasesStats: [],
    noProductFoundStats: [],
    productClicksStats: []
};

// Reducer

export default (state = initialState, action) => {
    switch (action.type) {

        case REQUEST(ACTION_TYPES.GET_PRODUCT_CLICKS_COUNT):
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case FAILURE(ACTION_TYPES.GET_PRODUCT_CLICKS_COUNT):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.GET_PRODUCT_CLICKS_COUNT):
            return {
                ...state,
                loading: false,
                productClicksCount: action.payload.data
            };
        case REQUEST(ACTION_TYPES.GET_REDIRECT_URLS_COUNT):
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case FAILURE(ACTION_TYPES.GET_REDIRECT_URLS_COUNT):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.GET_REDIRECT_URLS_COUNT):
            return {
                ...state,
                loading: false,
                redirectUrlsCount: action.payload.data
            };
        case REQUEST(ACTION_TYPES.GET_SEARCHED_QUERIES_COUNT):
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case FAILURE(ACTION_TYPES.GET_SEARCHED_QUERIES_COUNT):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.GET_SEARCHED_QUERIES_COUNT):
            return {
                ...state,
                loading: false,
                searchedQueriesCount: action.payload.data
            };
        case REQUEST(ACTION_TYPES.GET_SEARCHED_PHRASES_STATS):
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case FAILURE(ACTION_TYPES.GET_SEARCHED_PHRASES_STATS):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.GET_SEARCHED_PHRASES_STATS):
            return {
                ...state,
                loading: false,
                searchedPhrasesStats: action.payload.data
            };
        case REQUEST(ACTION_TYPES.GET_NO_PRODUCT_FOUND_STATS):
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case FAILURE(ACTION_TYPES.GET_NO_PRODUCT_FOUND_STATS):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.GET_NO_PRODUCT_FOUND_STATS):
            return {
                ...state,
                loading: false,
                noProductFoundStats: action.payload.data
            };
        case REQUEST(ACTION_TYPES.GET_PRODUCT_CLICK_STATS):
            return {
                ...state,
                errorMessage: null,
                loading: true
            };
        case FAILURE(ACTION_TYPES.GET_PRODUCT_CLICK_STATS):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case SUCCESS(ACTION_TYPES.GET_PRODUCT_CLICK_STATS):
            return {
                ...state,
                loading: false,
                productClicksStats: action.payload.data
            };
        default:
            return state;
    }
};

export const getProductClickCount = () => ({
    type: ACTION_TYPES.GET_PRODUCT_CLICKS_COUNT,
    payload: axios.get(`${API_ROOT}/api/count/productClick`)
});

export const getRedirectUrlsCount = () => ({
    type: ACTION_TYPES.GET_REDIRECT_URLS_COUNT,
    payload: axios.get(`${API_ROOT}/api/count/urlRedirect`)
});

export const getSearchedQueriesCount = () => ({
    type: ACTION_TYPES.GET_SEARCHED_QUERIES_COUNT,
    payload: axios.get(`${API_ROOT}/api/count/searchedPhrase`)
});

export const getSearchedPhrasesStats = () => ({
    type: ACTION_TYPES.GET_SEARCHED_PHRASES_STATS,
    payload: axios.get(`${API_ROOT}/api/analytics/stats/searchedPhrase`)
});

export const getNoProductFoundStats = () => ({
    type: ACTION_TYPES.GET_NO_PRODUCT_FOUND_STATS,
    payload: axios.get(`${API_ROOT}/api/analytics/stats/noProductFound`)
});

export const getProductClicksStats = () => ({
    type: ACTION_TYPES.GET_PRODUCT_CLICK_STATS,
    payload: axios.get(`${API_ROOT}/api/analytics/product-clicks`)
});


