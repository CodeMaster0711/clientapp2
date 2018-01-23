import * as React from "react";


export interface ISocialProps {
  providerUrl: string;
  label: string;
  scope: string;
  grant_options: string;
}

export interface ISocialState {
  shop: string;
}

export default class Social extends React.Component<ISocialProps, ISocialState> {

  constructor(props: ISocialProps) {
    super(props);
    this.state = {shop: ''}
    this.handleShopNameChange = this.handleShopNameChange.bind(this);
  }

  handleShopNameChange(event) {
    this.setState({shop: event.target.value})
  }

  render() {
    return (
      <form action={this.props.providerUrl} method="POST">
        <div className="form-group row">
          <input name="scope" type="hidden" value={this.props.scope}/>
          <input name="grant_options[]" type="hidden" value={this.props.grant_options}/>
          <input name="_csrf" type="hidden" value=""/>
          <input type="text" name="shop_name" id="shop_name" value={this.state.shop}
                 onChange={this.handleShopNameChange} required/>
          <div className="input-group-addon">.myshopify.com</div>
        </div>

        <div className="form-group row">
          <div className="offset-sm-2 col-sm-10">
            <button type="submit" className="btn btn-primary">
              Sign in with { this.props.label }
            </button>
          </div>
        </div>
      </form>
    );
  }
}

