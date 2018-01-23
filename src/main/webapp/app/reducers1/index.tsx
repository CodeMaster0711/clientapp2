import {SearchState, StoreState} from '../types/index';
import {GET_FACETS} from '../constants/index';
import {combineReducers} from 'redux';

export default combineReducers<StoreState>({
  search
});

export function search(state: SearchState = {
  searchFacet: []
}, action: any): SearchState {
  switch (action.type) {
    case GET_FACETS:
      return {
        searchFacet: action.payload.data.searchFacet
      };
    default:
      return state;
  }
}
