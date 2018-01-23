/* tslint:disable */ import * as React from 'react';
import Facet, {FacetProps} from './Facet';
import * as queryString from 'query-string';
import { withRouter } from 'react-router-dom'


class FacetContainer extends React.PureComponent<FacetProps, {}> {


  constructor(props) {
    super(props);
    this.onFacetSelect = this.onFacetSelect.bind(this);
    this.onFacetRemove = this.onFacetRemove.bind(this);
  }

  onFacetSelect = (fieldName: string, key: string) => {

    const {location, history} = this.props;

    const search = queryString.parse(location.search);

    search.page = undefined;

    if (search[fieldName] === undefined) {
      search[fieldName] = [key]
    } else if (!Array.isArray(search[fieldName])) {
      search[fieldName] = [key, search[fieldName]]
    } else {
      search[fieldName] = [key, ...search[fieldName]]
    }

    history.push({
      ...location,
      search: queryString.stringify(search)
    })

  };

  onFacetRemove = (fieldName: string, key: string) => {
    const {location, history, facetValues} = this.props;

    const search = queryString.parse(location.search);


    search.page = undefined;

    if (!Array.isArray(search[fieldName]) || this.lastCheckedValueInFacet(facetValues)) {
      search[fieldName] = undefined
    } else {
      search[fieldName] = search[fieldName].filter(value => value !== key)
    }

    history.push({
      ...location,
      search: queryString.stringify(search)
    });

  };

  private lastCheckedValueInFacet(facetValues: any) {
    return facetValues.filter(fv => fv.active && fv.quantity != 0).length == 1;
  }

  render() {
    return (
      <Facet
        onFacetSelect={this.onFacetSelect}
        onFacetRemove={this.onFacetRemove}
        {...this.props}/>
    )
  }
}

export default withRouter(FacetContainer);
