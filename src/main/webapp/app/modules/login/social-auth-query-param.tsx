/* tslint:disable */
import * as React from "react";
import {connect} from 'react-redux';
import Storage from '../../shared/util/storage-util';


export interface ISocialAuthProps {
    loginWithToken: Function;
    history: any;
}

export default class SocialAuthQueryString extends React.Component<ISocialAuthProps, undefined> {

    componentDidMount() {
        const jwtToken = location.hash.substr(1).substr(location.hash.substr(1).indexOf('jwt=')).split('&')[0].split('=')[1];
        Storage.session.set('jhi-authenticationToken', jwtToken);
        this.props.history.push('/');
    }

    render() {
        return (<div></div>);
    }
}
