export interface StoreState {
  search: SearchState;
}

export interface SearchState {
  searchFacet: Facet[];
}

export interface Facet {
  fieldName: string;
  label: string;
  active: boolean;
  values: FacetValue[];
}

export interface FacetValue {
  active: boolean;
  value: string;
  valueKey: string;
  quantity: number;
  minValue: number;
  maxValue: number;
}
