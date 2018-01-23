/* tslint:disable */ import * as React from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';

export interface FacetWrapperProps {
  children: any;
  fieldName: string;
  label: string;
  index: number;
}

const FacetWrapper = ({children, fieldName, label, index}: FacetWrapperProps) => (
  <Card key={fieldName}>
    <CardHeader>
      {label}
    </CardHeader>
    <CardBody>
      {children}
    </CardBody>
  </Card>
);

export default FacetWrapper;
