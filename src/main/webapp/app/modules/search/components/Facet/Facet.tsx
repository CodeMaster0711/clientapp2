/* tslint:disable */ import * as React from 'react';

import FacetWrapper from './FacetWrapper';
import {InputGroup, InputGroupAddon, Input, Label} from 'reactstrap';
import {FacetValue} from '../../../../types/index';


export interface FacetProps {
  active?: boolean;
  fieldName: string;
  label: string;
  index: number;
  onFacetSelect?: Function;
  onFacetRemove?: Function;
  facetValues: FacetValue[];
  location?: Location;
  history?: any;
  onSelectSearchResult?: () => void;
  onUnselectSearchResult?: () => void;
}

const Facet = ({
                 fieldName,
                 label,
                 index,
                 onFacetSelect,
                 onFacetRemove,
                 facetValues
               }: FacetProps) => {
  return (
    <FacetWrapper
      fieldName={fieldName}
      label={label}
      index={index}>
      { facetValues.filter(value => !!value.quantity)
        .map(value => (
          <InputGroup key={value.valueKey}>
            <Label check>
              <Input
                type="checkbox"
                checked={value.active}
                onChange={e => {
                  if (e.target.checked) {
                    onFacetSelect(fieldName, value.valueKey)
                  } else {
                    onFacetRemove(fieldName, value.valueKey)
                  }
                }}/>
              {' '}
              {
                value.value ? (
                  <small>{`${value.value} (${value.quantity})`}</small>
                ) : (

                  <small>
                    {value.minValue} {value.maxValue ? ' - ' + value.maxValue : ' or more'}
                    ({value.quantity})
                  </small>
                )
              }</Label>
          </InputGroup>
        ))
      }
    </FacetWrapper>
  )
};

export default Facet;
