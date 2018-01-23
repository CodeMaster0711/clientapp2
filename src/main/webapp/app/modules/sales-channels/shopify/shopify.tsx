/* tslint:disable */ import * as React from 'react';

export interface IShopifyProps {

}

export interface IShopifyState {
  shop: string;
}


export default class Shopify extends React.Component<IShopifyProps, IShopifyState> {

  constructor(props: IShopifyProps) {
    super(props);
    this.state = {shop: ''}
    this.handleShopNameChange = this.handleShopNameChange.bind(this);
  }

  handleShopNameChange(event) {
    this.setState({shop: event.target.value})
  }

  render() {
    return (
      <div className="col-md-6">
        <form action="/connect/shopify" method="POST">
          <div className="form-group row">
            <input name="_csrf" type="hidden" value=""/>
            <input name="scope" type="hidden" value="read_products,write_content,write_script_tags,read_orders,write_themes,read_customers"/>
            <input type="text" name="shop_name" id="shop_name" value={this.state.shop}
                   onChange={this.handleShopNameChange} required/>
            <div className="input-group-addon">.myshopify.com</div>
          </div>

          <div className="form-group row">
            <div className="offset-sm-2 col-sm-10">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}


