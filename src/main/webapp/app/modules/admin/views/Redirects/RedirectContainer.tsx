/* tslint:disable */
import * as React from 'react';
import {Container, Row, Col, Button, Input, InputGroup, InputGroupAddon, InputGroupButton} from 'reactstrap';
import {
    Badge,
    Card,
    CardHeader,
    CardBody,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap";

import RedirectList from "./Redirects";
import NewRedirectItem from "./NewRedirectItem";
import {connect} from 'react-redux';
import {addRedirect, deleteRedirect, getRedirects} from "../../../../reducers/redirects";
import StatefulToolTip from "../../components/ToolTip/StatefulToolTip";


class RedirectContainer extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.addEvent = this.addEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    componentDidMount() {
        this.props.getRedirects();
    }

    render() {
        const toolTipText = "Use Redirect functionality to redirect user to a page/url when user types certain keyword." ;
        return (
            <div className="animated fadeIn">

                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="icon-refresh"></i> Redirects <StatefulToolTip id="redirectToolTip" position="right" arrow="center"
                                                                                            text={toolTipText}/>
                            </CardHeader>
                            <CardBody className="card-body">
                                <RedirectList items={this.props.redirects} deleteEvent={this.deleteEvent}/>
                                <NewRedirectItem addEvent={this.addEvent}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }

    addEvent(newRedirectItem) {
        this.props.addRedirect(newRedirectItem.keyword, newRedirectItem.url);
    }

    deleteEvent(id) {
        this.props.deleteRedirect(id);
    }

}

const mapStateToProps = storeState => ({
    redirects: storeState.redirects.redirects,
    isFetching: storeState.redirects.loading
});

const mapDispatchToProps = {getRedirects, addRedirect, deleteRedirect};

export default connect(mapStateToProps, mapDispatchToProps)(RedirectContainer);