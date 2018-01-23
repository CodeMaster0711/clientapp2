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

import SynonymsList from "./Associations";
import NewSynonymItem from "./NewMerhchandisingItem";
import {connect} from 'react-redux';
import {addSynonyms, deleteSynonyms, getSynonyms} from "../../../../reducers/synonyms";
import {MERCHANDISING} from "../../../../reducers/synonym-type";
import StatefulToolTip from "../../components/ToolTip/StatefulToolTip";


class SynonymsContainer extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.addEvent = this.addEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    componentDidMount() {
        this.props.getSynonyms(MERCHANDISING);
    }

    render() {
        const toolTipText = "Use the merchandising tool to highlight specific product categories or products by tagging them to commonly searched keywords. Example, " +
            "if you want to highlight 'iphone', you can tag 'iphone' to its commonly assoicate words such as 'latest', 'sleek' and 'cool'" ;
        return (
            <div className="animated fadeIn">

                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="icon-bag"></i> Merchandising <StatefulToolTip id="merchandisingToolTip" position="right" arrow="center"
                                                                                            text={toolTipText}/>
                            </CardHeader>
                            <CardBody className="card-body">
                                <SynonymsList items={this.props.synonyms} deleteEvent={this.deleteEvent} />
                                <NewSynonymItem addEvent={this.addEvent}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }

    addEvent(synonymsItem) {
        this.props.addSynonyms(synonymsItem.newItem, MERCHANDISING);
    }

    deleteEvent(id) {
        this.props.deleteSynonyms(id);
    }

}

const mapStateToProps = storeState => ({
    synonyms: storeState.synonyms.synonyms.filter(sn => sn.type === MERCHANDISING),
    isFetching: storeState.synonyms.loading
});

const mapDispatchToProps = {getSynonyms, addSynonyms, deleteSynonyms};

export default connect(mapStateToProps, mapDispatchToProps)(SynonymsContainer);