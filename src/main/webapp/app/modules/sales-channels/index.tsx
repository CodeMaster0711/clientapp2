/* tslint:disable */ import * as React from 'react';
import { Route } from 'react-router-dom';

import Shopify from './shopify/shopify';
import Connections from './shopify/connections';

const Routes = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/shopify`} component={Shopify} />
    <Route exact path={`${match.url}/connections`} component={Connections} />
  </div>
);

export default Routes;
