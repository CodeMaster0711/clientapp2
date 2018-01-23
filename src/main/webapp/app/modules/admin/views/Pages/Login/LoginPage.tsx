/* tslint:disable */
import * as React from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import {login} from '../../../../../reducers/authentication';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {AvForm, AvField} from 'availity-reactstrap-validation';


export interface ILoginProps {
  isAuthenticated?: boolean;
  loading?: boolean;
  loginError?: boolean;
  location?: any;
  login?: Function;
}

export interface ILoginState {
  redirectToReferrer: boolean;
  username: string;
  password: string;
}

class LoginPage extends React.Component<ILoginProps, ILoginState> {

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: props.isAuthenticated,
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentWillReceiveProps(nextProps: ILoginProps) {
    this.setState({
      redirectToReferrer: nextProps.isAuthenticated
//      redirectToReferrer: nextProps.isAuthenticated
    });
  }

  handleLogin = (username, password, rememberMe = false) => {
    this.props.login(username, password, rememberMe);
  };

  handleSubmit = () => {
    const {username, password} = this.state;
    this.handleLogin(username, password, false);
  };

  handleUsernameChange = event => {
    this.setState({username: event.target.value});
  };

  handlePasswordChange = event => {
    this.setState({password: event.target.value});
  };

  render() {

    const {from} = this.props.location.state || {from: {pathname: '/', search: this.props.location.search}};
    const {redirectToReferrer} = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from}/>;
    }
    if (this.props.loading) {
      return (

        <div className="app flex-row align-items-center">
          <Container>
            <Row>
              <Col />
              <Col>
                <i className="fa fa-circle-o-notch fa-lg fa-spin mt-4"></i>
              </Col>
              <Col />
            </Row>
          </Container>
        </div>
      );
    } else {
      return (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>


                      <AvForm onSubmit={this.handleSubmit}>

                        <InputGroup className="mb-3">
                          <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                          <Input type="text" placeholder="Username" value={this.state.username}
                                 onChange={this.handleUsernameChange}/>
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                          <Input type="password" placeholder="Password" value={this.state.password}
                                 onChange={this.handlePasswordChange}/>
                        </InputGroup>
                        <Row>
                          <Col xs="6">
                            <Button color="primary" className="px-4" type="submit">Login</Button>
                          </Col>
                          <Col xs="6" className="text-right">
                            <Button color="link" className="px-0">Forgot password?</Button>
                          </Col>
                        </Row>
                      </AvForm>

                    </CardBody>
                  </Card>
                  {/*<Card className="text-white bg-primary py-5 d-md-down-none" style={{width: 44 + '%'}}>
                    <CardBody className="text-center">
                      <div>
                        <h2>Sign up</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua.</p>
                        <Button color="primary" className="mt-3" active>Register Now!</Button>
                      </div>
                    </CardBody>
                  </Card>*/}
                  <Card className="text-white bg-primary py-5 d-md-down-none" style={{width: 44 + '%'}}>
                    <CardBody className="text-center">
                      <div>
                        <p>If you are a shopify user, you can login to SearchIT dashboard by clicking on your SearchIT app in Shopify Admin -> Apps section.</p>
                      </div>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }

  }
}


const mapStateToProps = storeState => ({
  isAuthenticated: storeState.authentication.isAuthenticated,
  loading: storeState.authentication.loading,
  loginError: storeState.authentication.loginError
});

const mapDispatchToProps = {login};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
