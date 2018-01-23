/* tslint:disable */

import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from './action-type.util';
import {API_ROOT} from "../shared/util/api-config";


export const ACTION_TYPES = {
  FETCH_GATEWAY_ROUTE: 'administration/FETCH_GATEWAY_ROUTE',
  FETCH_LOGS: 'administration/FETCH_LOGS',
  FETCH_LOGS_CHANGE_LEVEL: 'administration/FETCH_LOGS_CHANGE_LEVEL',
  FETCH_HEALTH: 'administration/FETCH_HEALTH',
  FETCH_METRICS: 'administration/FETCH_METRICS',
  FETCH_USERS: 'administration/FETCH_USERS',
  FETCH_CONFIGURATIONS: 'administration/FETCH_CONFIGURATIONS',
  FETCH_ENV: 'administration/FETCH_ENV',
  FETCH_AUDITS: 'administration/FETCH_AUDITS'
};

const initialState = {
  loading: false,
  errorMessage: null,
  gateway: {
    routes: []
  },
  logs: {
    loggers: []
  },
  health: {},
  metrics: {},
  userManagement: {
    users: []
  },
  configuration: {
    configProps: {},
    env: {}
  },
  audits: []
};

// Reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_GATEWAY_ROUTE):
    case REQUEST(ACTION_TYPES.FETCH_METRICS):
    case REQUEST(ACTION_TYPES.FETCH_LOGS):
    case REQUEST(ACTION_TYPES.FETCH_USERS):
    case REQUEST(ACTION_TYPES.FETCH_CONFIGURATIONS):
    case REQUEST(ACTION_TYPES.FETCH_ENV):
    case REQUEST(ACTION_TYPES.FETCH_AUDITS):
    case REQUEST(ACTION_TYPES.FETCH_HEALTH):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_GATEWAY_ROUTE):
    case FAILURE(ACTION_TYPES.FETCH_METRICS):
    case FAILURE(ACTION_TYPES.FETCH_LOGS):
    case FAILURE(ACTION_TYPES.FETCH_USERS):
    case FAILURE(ACTION_TYPES.FETCH_CONFIGURATIONS):
    case FAILURE(ACTION_TYPES.FETCH_ENV):
    case FAILURE(ACTION_TYPES.FETCH_AUDITS):
    case FAILURE(ACTION_TYPES.FETCH_HEALTH):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_GATEWAY_ROUTE):
      return {
        ...state,
        loading: false,
        gateway: {
          routes: action.payload.data
        }
      };
    case SUCCESS(ACTION_TYPES.FETCH_METRICS):
      return {
        ...state,
        loading: false,
        metrics: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOGS):
      return {
        ...state,
        loading: false,
        logs: {
          loggers: action.payload.data
        }
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERS):
      return {
        ...state,
        loading: false,
        userManagement: {
          users: action.payload.data
        }
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONFIGURATIONS):
      return {
        ...state,
        loading: false,
        configuration: {
          ...state.configuration,
          configProps: action.payload.data
        }
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENV):
      return {
        ...state,
        loading: false,
        configuration: {
          ...state.configuration,
          env: action.payload.data
        }
      };
    case SUCCESS(ACTION_TYPES.FETCH_AUDITS):
      return {
        ...state,
        loading: false,
        audits: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_HEALTH):
      return {
        ...state,
        loading: false,
        health: action.payload.data
      };
    default:
      return state;
  }
};

// Actions
export const gatewayRoutes = () => ({
  type: ACTION_TYPES.FETCH_GATEWAY_ROUTE,
  payload: axios.get(`${API_ROOT}/api/gateway/routes`)
});

export const getLoggers = () => ({
  type: ACTION_TYPES.FETCH_LOGS,
  payload: axios.get(`${API_ROOT}/management/logs`)
});

export const systemHealth = () => ({
  type: ACTION_TYPES.FETCH_HEALTH,
  payload: axios.get(`${API_ROOT}/management/health`)
});

export const systemMetrics = () => ({
  type: ACTION_TYPES.FETCH_METRICS,
  payload: axios.get(`${API_ROOT}/management/jhipster/metrics`)
});

export const changeLogLevel = (name, level) => {
  const body = {
    level,
    name
  };
  return async dispatch => {
    await dispatch({
      type: ACTION_TYPES.FETCH_LOGS_CHANGE_LEVEL,
      payload: axios.put(`${API_ROOT}/management/jhipster/logs`, body)
    });
    dispatch(getLoggers());
  };
};

export const getUsers = (page = 0, size = 10, sort = 'id, asc') => ({
  type: ACTION_TYPES.FETCH_USERS,
  payload: axios.get(`${API_ROOT}/api/users?cacheBuster=${new Date().getTime()}&page=${page}&size=${size}&sort=${sort}`)
});

export const getConfigurations = () => ({
  type: ACTION_TYPES.FETCH_CONFIGURATIONS,
  payload: axios.get(`${API_ROOT}/management/configprops`)
});

export const getEnv = () => ({
  type: ACTION_TYPES.FETCH_ENV,
  payload: axios.get(`${API_ROOT}/management/env`)
});

export const getAudits = (fromDate, toDate, page = 0, size = 20) => {
  let requestUrl = `${API_ROOT}/management/jhipster/audits?page=${page}&size=${size}`;
  if (toDate) {
    requestUrl += `&toDate=${toDate}`;
  }
  if (fromDate) {
    requestUrl += `&fromDate=${fromDate}`;
  }
  return {
    type: ACTION_TYPES.FETCH_AUDITS,
    payload: axios.get(requestUrl)
  };
};
