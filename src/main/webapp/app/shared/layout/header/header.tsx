/* tslint:disable */

import './header.css';
/* tslint:disable */ import * as React from 'react';
import {Translate} from 'react-jhipster';
import {
  Navbar, Nav, NavItem, NavLink, NavbarToggler, NavbarBrand, Collapse,
  UncontrolledNavDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {NavLink as Link} from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import {locales} from '../../../config/translation';
import appConfig from '../../../config/constants';
import { connect } from 'react-redux';
import {getSession, login, logout} from '../../../reducers/authentication';
import {setLocale} from '../../../reducers/locale';
import LoginModal from "../../../modules/login/login-modal";

const devEnv = process.env.NODE_ENV === 'development';

export interface IHeaderProps {
  currentLocale: string;
  onLocaleChange: Function;
  isAuthenticated?: boolean;
  isLoginModalOpen?: boolean;
  loginError?: boolean;
  login?: Function;
  logout?: Function;
}

const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img
      src="static/images/logo-jhipster-react.svg"
      alt="Logo"
    />
  </div>
);
export class Header extends React.Component<IHeaderProps, { menuOpen: boolean, showLoginModal: boolean}> {

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      showLoginModal: !props.isAuthenticated && (props.isLoginModalOpen ? props.isLoginModalOpen : false)
    };

    this.loginToggle = this.loginToggle.bind(this);
  }

  componentWillReceiveProps(nextProps: IHeaderProps) {
    this.setState({
      showLoginModal: !nextProps.isAuthenticated && (nextProps.isLoginModalOpen ? nextProps.isLoginModalOpen : false)
    });
  }


  loginToggle() {
    this.setState({
      showLoginModal: !this.state.showLoginModal
    });
  }

  handleLogin = (username, password, rememberMe = false) => {
    this.props.login(username, password, rememberMe);
  }

  handleClose = () => {
    this.setState({ showLoginModal: false });
  }

  handleLocaleChange = event => {
    this.props.onLocaleChange(event.target.value);
  }

  renderDevRibbon = () => (
    process.env.NODE_ENV === 'development' ?
      <div className="ribbon dev"><a href=""><Translate contentKey="global.ribbon.dev"/></a></div> :
      null
  )

  toggleMenu = () => {
    this.setState({menuOpen: !this.state.menuOpen});
  }

  render() {
    const isAuthenticated = this.props.isAuthenticated;
    return (
      <div id="app-header">
        {this.renderDevRibbon()}
        <LoadingBar className="loading-bar"/>
        <Navbar dark expand="sm" fixed="top" className="jh-navbar">
          <NavbarToggler onClick={this.toggleMenu}/>
          <NavbarBrand tag={Link} to="/" className="brand-logo">
            <BrandIcon />
            <span className="brand-title"><Translate contentKey="global.title">AppName</Translate></span>
            <span className="navbar-version">{appConfig.version}</span>
          </NavbarBrand>
          <Collapse isOpen={this.state.menuOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/">
                  {/* <i className="fa fa-home" aria-hidden="true"/> */}
                  <span>Home</span>
                </NavLink>
              </NavItem>
              {isAuthenticated ?
                <UncontrolledNavDropdown>
                  <DropdownToggle nav caret>
                    Add Sales Channels
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag={Link} to="/sales-channels/shopify">Shopify</DropdownItem>
                    <DropdownItem tag={Link} to="/sales-channels/connections">Connections</DropdownItem>
                  </DropdownMenu>
                </UncontrolledNavDropdown> : null}

              {isAuthenticated ?
                <UncontrolledNavDropdown>
                  <DropdownToggle nav caret>
                    Entities
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem divider/>
                  </DropdownMenu>
                </UncontrolledNavDropdown> : null}
              {devEnv && isAuthenticated ?
                <UncontrolledNavDropdown>
                  <DropdownToggle nav caret>
                    Administration
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag={Link} to="/admin/health">Health</DropdownItem>
                    <DropdownItem tag={Link} to="/admin/metrics">Metrics</DropdownItem>
                    <DropdownItem tag={Link} to="/admin/configuration">Configuration</DropdownItem>
                    <DropdownItem tag={Link} to="/admin/docs">API Docs</DropdownItem>
                  </DropdownMenu>
                </UncontrolledNavDropdown> : null
              }<UncontrolledNavDropdown>
              <DropdownToggle nav caret>
                Account
              </DropdownToggle>

              <DropdownMenu right>
                {isAuthenticated ? <DropdownItem tag={Link} to="/account/settings">Settings</DropdownItem> : null}
                {isAuthenticated ? <DropdownItem tag={Link} to="/account/password">Password</DropdownItem> : null}
                {isAuthenticated ? <DropdownItem onClick={this.props.logout}>Logout</DropdownItem> : null}
                {!isAuthenticated ? <DropdownItem onClick={this.loginToggle}>Login</DropdownItem> : null}
              </DropdownMenu>
            </UncontrolledNavDropdown>
              { locales.length > 1 ?
                <UncontrolledNavDropdown>
                  <DropdownToggle nav caret>
                    {this.props.currentLocale.toUpperCase()}
                  </DropdownToggle>
                  <DropdownMenu right>
                    {locales.map(lang => <DropdownItem key={lang} value={lang}
                                                       onClick={this.handleLocaleChange}>{lang.toUpperCase()}</DropdownItem>)}
                  </DropdownMenu>
                </UncontrolledNavDropdown> : null
              }
            </Nav>
          </Collapse>
        </Navbar>
        <LoginModal
          showModal={this.state.showLoginModal}
          handleLogin={this.handleLogin}
          handleClose={this.handleClose}
          loginError={this.props.loginError}
        />


      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  isAuthenticated: storeState.authentication.isAuthenticated,
  currentLocale: storeState.locale.currentLocale,
  embedded: storeState.layout.embedded
});

const mapDispatchToProps = { getSession, setLocale, logout, login };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
