/* tslint:disable */ import * as React from 'react';
import { Route } from 'react-router-dom';
import SearchAutosuggest from './modules/search/components/Autosuggest/search-autosuggest';


export default class SearchAppRoutes extends React.Component<any, any> {
  render() {
    return (
        <div>
          <Route path="/" component={SearchAutosuggest}/>
        </div>
    );
  }
}

