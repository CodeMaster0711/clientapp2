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

import SynonymsList from "./Synonyms";
import NewSynonymItem from "./NewSynonymItem";
import {connect} from 'react-redux';
import {addSynonyms, deleteSynonyms, getSynonyms} from "../../../../reducers/synonyms";
import {SYNONYM} from "../../../../reducers/synonym-type";
import StatefulToolTip from '../../components/ToolTip/StatefulToolTip';


class SynonymsContainer extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.addEvent = this.addEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    componentDidMount() {
        this.props.getSynonyms(SYNONYM);
    }

    render() {

        const toolTipText = "Use the synonyms tool to improve your search results and customer experience. " +
            "For example, if your store has the product category 'blazer', this tool allows you to tag any number of words that have a meaning similar to 'blazer'(example: 'jacket','coat')." +
            " Now, when a user searches for 'jacket' in the storefront, the search results will be the same as if the word 'blazer' was searched." ;

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="icon-docs"></i> Synonyms <StatefulToolTip id="synonymsToolTip" position="bottom" arrow="center"
                                                                                        text={toolTipText}/>
                            </CardHeader>
                            <CardBody className="card-body">
                                <SynonymsList items={this.props.synonyms} deleteEvent={this.deleteEvent}/>
                                <NewSynonymItem addEvent={this.addEvent}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }

    addEvent(synonymsItem) {
        this.props.addSynonyms(synonymsItem.newItem, SYNONYM);
    }

    deleteEvent(id) {
        this.props.deleteSynonyms(id);
    }

}

const mapStateToProps = storeState => ({
    synonyms: storeState.synonyms.synonyms.filter(sn => sn.type === SYNONYM),
    isFetching: storeState.synonyms.loading
});

const mapDispatchToProps = {getSynonyms, addSynonyms, deleteSynonyms};

export default connect(mapStateToProps, mapDispatchToProps)(SynonymsContainer);