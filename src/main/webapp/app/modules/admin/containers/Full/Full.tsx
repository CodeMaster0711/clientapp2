/* tslint:disable */ import * as React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Footer from '../../components/Footer/Footer';
import Dashboard from '../../views/Dashboard/Dashboard';
import Charts from '../../views/Charts/Charts';
import Widgets from '../../views/Widgets/Widgets';

// Components
import Buttons from '../../views/Components/Buttons/Buttons';
import Cards from '../../views/Components/Cards/Cards';
import Forms from '../../views/Components/Forms/Forms';
import Modals from '../../views/Components/Modals/Modals';
import SocialButtons from '../../views/Components/SocialButtons/SocialButtons';
import Switches from '../../views/Components/Switches/Switches';
import Tables from '../../views/Components/Tables/Tables';
import Tabs from '../../views/Components/Tabs/Tabs';

// Icons
import FontAwesome from '../../views/Icons/FontAwesome/FontAwesome';
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/SimpleLineIcons';

class Full extends React.Component<any, any> {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/components/buttons" component={Buttons}/>
                <Route path="/components/cards" component={Cards}/>
                <Route path="/components/forms" component={Forms}/>
                <Route path="/components/modals" component={Modals}/>
                <Route path="/components/social-buttons" component={SocialButtons}/>
                <Route path="/components/switches" component={Switches}/>
                <Route path="/components/tables" component={Tables}/>
                <Route path="/components/tabs" component={Tabs}/>
                <Route path="/icons/font-awesome" component={FontAwesome}/>
                <Route path="/icons/simple-line-icons" component={SimpleLineIcons}/>
                <Route path="/widgets" component={Widgets}/>
                <Route path="/charts" component={Charts}/>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
          {/*<Aside />*/}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
