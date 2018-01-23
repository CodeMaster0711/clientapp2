import * as constants from '../constants';
import axios from 'axios';
import * as queryString from 'query-string';


export interface GetFacets {
  type: constants.GET_FACETS;
  payload: any;
}

export type FacetAction = GetFacets;


export function getFacets(searchParams: any): GetFacets {

  const url = `http://localhost:3000/api/catalog/search?includePromotionMessages=true&q=sauce&${queryString.stringify(searchParams)}`;

  const request = axios.get(url);

  return {
    type: constants.GET_FACETS,
    payload: request
  };
}
