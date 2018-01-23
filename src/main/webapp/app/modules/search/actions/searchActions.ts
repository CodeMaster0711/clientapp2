import {buildKey} from '../../../search-reducers/searchReducer';

export const SearchActionTypes = {
  Request: '@Search.Request',
  Success: '@Search.Success',
  Failure: '@Search.Failure'
};

export const fetchSearch = (uri: string, criteria = {
  q: '*',
  page: undefined,
  sort: undefined
}) => {
  return function (dispatch, getState) {

    const {search} = getState();

    const searchKey = buildKey(criteria);

    if (!!search[searchKey]) {
      return undefined;
    }


    let actionObject = {
      type: SearchActionTypes.Success,
      payload: {}
    };
    return dispatch(actionObject);
  }
};
