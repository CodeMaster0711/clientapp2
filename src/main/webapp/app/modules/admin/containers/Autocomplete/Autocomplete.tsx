/* tslint:disable */
import * as React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Footer from '../../components/Footer/Footer';
import Synonyms from '../../views/Synonyms/SynonymsContainer';
import AutocompleteDashboard from '../../views/AutocompletDashboard/AutocompleteDashboard';
import Merchandising from '../../views/Merchandising/MerhcandisingContainer';
import Redirects from '../../views/Redirects/RedirectContainer';
import Customizations from "../../views/Customizations/Customizations";
import Support from '../../views/Support/Support';

class Autocomplete extends React.Component<any, any> {
    render() {
        return (
            <div className="app">
                <Header/>
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <main className="main">
                        <Breadcrumb/>
                        <Container fluid>
                            <Switch>
                                <Route path="/dashboard" component={AutocompleteDashboard}/>
                                <Route path="/customizations" component={Customizations}/>
                                <Route path="/synonyms" component={Synonyms}/>
                                <Route path="/merchandising" component={Merchandising}/>
                                <Route path="/redirects" component={Redirects}/>
                                <Route path="/support" component={Support}/>
                                <Redirect from="/" to="/dashboard"/>
                            </Switch>
                        </Container>
                    </main>
                    {/*<Aside />*/}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Autocomplete;
