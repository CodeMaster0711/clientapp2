/* tslint:disable */
import * as React from 'react';

import {connect} from 'react-redux';
import ColorPicker from './ColorPicker';
import {
    getCustomizations, getSearchResultsCustomizations,
    saveCustomizations, saveSearchResultsCustomizations
} from "../../../../reducers/customizations";
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    Form,
    Badge
} from 'reactstrap';
import StatefulToolTip from "../../components/ToolTip/StatefulToolTip";
import StatefulPictureToolTip from "../../components/ToolTip/StatefulPictureToolTip";


class Customizations extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            customizations: [],
            searchResultCustomizations: []
        };
        this.onChangeComplete = this.onChangeComplete.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSearchResultSubmit = this.onSearchResultSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.customizations !== this.props.customizations) {
            this.setState({customizations: nextProps.customizations})
        }

        if (nextProps.searchResultCustomizations !== this.props.searchResultCustomizations) {
            this.setState({searchResultCustomizations: nextProps.searchResultCustomizations})
        }
    }

    componentDidMount(): void {
        this.props.getCustomizations();
        this.props.getSearchResultsCustomizations();
    }


    render() {

        const toolTipText = "Use this section to change the look and feel of your autocomplete.";
        const searchToolTipText = "Use this section to change the look and feel of your search results page.";

        const {customizations, searchResultCustomizations} = this.state;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <Form onSubmit={this.onSubmit} className="">
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i> Autocomplete Styles {/*<StatefulToolTip
                                    id="customizationToolTip" position="right" arrow="center"
                                    text={toolTipText}/>*/}
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead>
                                        </thead>
                                        <tbody>

                                        {
                                            customizations.map((c, idx) => (
                                                <tr key={`color-${idx}`}>

                                                    <td>
                                                        {c.label} <StatefulPictureToolTip
                                                        id={'autocomplete-styles-' + idx}
                                                        position="right"
                                                        arrow="center"
                                                        imgSrc={c.description}/>
                                                    </td>
                                                    <td><ColorPicker color={c.value}
                                                                     id={idx}
                                                                     label={c.label}
                                                                     onChangeComplete={this.onChangeComplete}
                                                                     key={`color-pic-${c.id}`}/></td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </Table>
                                </CardBody>
                                <CardFooter className="text-right">
                                    <Button color="primary">Save</Button>
                                </CardFooter>
                            </Form>
                        </Card>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Form onSubmit={this.onSearchResultSubmit} className="">
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i> Search Result Styles {/*<StatefulToolTip
                                    id="customizationSearchResultToolTip" position="right" arrow="center"
                                    text={searchToolTipText}/>*/}
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead>
                                        </thead>
                                        <tbody>

                                        {
                                            searchResultCustomizations.map((c, idx) => (
                                                <tr key={`search-result-color-${idx}`}>

                                                    <td>{c.label} <StatefulPictureToolTip
                                                        id={'search-results-styles-' + idx}
                                                        position="right"
                                                        arrow="center"
                                                        imgSrc={c.description}/>
                                                    </td>
                                                    <td><ColorPicker color={c.value}
                                                                     id={idx}
                                                                     label={c.label}
                                                                     onChangeComplete={this.onSearchResultChangeComplete}
                                                                     key={`color-pic-${c.id}`}/></td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </Table>
                                </CardBody>
                                <CardFooter className="text-right">
                                    <Button color="primary">Save</Button>
                                </CardFooter>
                            </Form>
                        </Card>
                    </Col>

                </Row>

            </div>
        );
    }

    onChangeComplete = (id, color) => {
        const customizations = this.state.customizations;
        customizations[id]['value'] = color.hex;

        this.setState({customizations})
    };

    onSubmit(event) {
        event.preventDefault();
        const customizations = this.state.customizations;
        this.props.saveCustomizations(customizations);
        alert('Your changes were saved successfully.')
    }

    onSearchResultSubmit(event) {
        event.preventDefault();
        const searchResultCustomizations = this.state.searchResultCustomizations;
        this.props.saveSearchResultsCustomizations(searchResultCustomizations);
        alert('Your changes were saved successfully.')
    }

    onSearchResultChangeComplete = (id, color) => {
        const searchResultCustomizations = this.state.searchResultCustomizations;
        searchResultCustomizations[id]['value'] = color.hex;

        this.setState({searchResultCustomizations})
    };

}

const mapStateToProps = storeState => ({
    customizations: storeState.customizations.customizations,
    searchResultCustomizations: storeState.customizations.searchResultCustomizations
});

const mapDispatchToProps = {
    getCustomizations,
    saveCustomizations,
    getSearchResultsCustomizations,
    saveSearchResultsCustomizations
};

export default connect(mapStateToProps, mapDispatchToProps)(Customizations);

