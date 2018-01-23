/* tslint:disable */
import axios from 'axios';

import {REQUEST, SUCCESS, FAILURE} from './action-type.util';
import {API_ROOT} from "../shared/util/api-config";

export const ACTION_TYPES = {
  FETCH_CONNECTIONS: 'sales-channels/FETCH_CONNECTIONS',
  CONNECT_SHOP: 'sales-channels/CONNECT_SHOP'
};

const initialState = {
  loading: false,
  errorMessage: null,
  connections: {}
};

// Reducer

export default (state = initialState, action) => {
  switch (action.type) {

    case REQUEST(ACTION_TYPES.FETCH_CONNECTIONS):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CONNECTIONS):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONNECTIONS):
      return {
        ...state,
        loading: false,
        connections: action.payload.data
      };
    default:
      return state;
  }
};

export const userConnections = () => ({
  type: ACTION_TYPES.FETCH_CONNECTIONS,
  payload: axios.get(`${API_ROOT}/api/connections`)
});
