import * as React from "react";
import {connect} from 'react-redux';
import * as Cookies from 'js-cookie';
import Storage from '../../shared/util/storage-util';


export interface ISocialAuthProps {
  loginWithToken: Function;
  history: any;
}

export default class SocialAuth extends React.Component<ISocialAuthProps, undefined> {

  componentDidMount() {
    const jwtToken = Cookies.get('social-authentication');
    Storage.session.set('jhi-authenticationToken', jwtToken);
    this.props.history.push('/');
  }

  render() {
    return (<div></div>);
  }
}
