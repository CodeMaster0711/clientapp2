/* tslint:disable */
import * as React from 'react';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';
import {connect} from 'react-redux';
import {
    getNoProductFoundStats,
    getProductClickCount, getProductClicksStats, getRedirectUrlsCount, getSearchedPhrasesStats,
    getSearchedQueriesCount
} from '../../../../reducers/analytics';
import StatefulToolTip from "../../components/ToolTip/StatefulToolTip";


class AutocompleteDashboard extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }


    componentDidMount(): void {
        this.props.getProductClickCount();
        this.props.getRedirectUrlsCount();
        this.props.getSearchedQueriesCount();
        this.props.getSearchedPhrasesStats();
        this.props.getNoProductFoundStats();
        this.props.getProductClicksStats();
    }

    render() {

        const {productClicksCount, redirectUrlsCount, searchedQueriesCount, searchedPhrasesStats, noProductFoundStats, productClicksStats} = this.props;

        const totalProductClicksToolTipText = "Shows the number of times customers clicked on the product link to visit product details page." ;
        const totalRedirectUrlsToolTipText = "Shows the number of times customer is redirected to a merchant specified url." ;
        const totalSearchedQueriesToolTipText = "Shows the aggregate number of queries made by customers." ;
        const topSearchedPhraseToolTipText = "Shows the keyword searched most by the customers." ;

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white bg-primary">
                            <CardBody className="pb-0">
                                <h4 className="mb-0">{productClicksCount}</h4>
                                <p>Total product clicks <StatefulToolTip position="right" arrow="center" id="totalProductClicksToolTip"
                                                                         text={totalProductClicksToolTipText}/></p>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white bg-info">
                            <CardBody className="pb-0">
                                <h4 className="mb-0">{redirectUrlsCount}</h4>
                                <p>Total redirect urls <StatefulToolTip position="right" arrow="center" id="totalRedirectUrlsToolTip"
                                                                        text={totalRedirectUrlsToolTipText}/></p>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white bg-warning">
                            <CardBody className="pb-0">
                                <h4 className="mb-0">{searchedQueriesCount}</h4>
                                <p>Total searched queries <StatefulToolTip position="right" arrow="center" id="totalSearchedQueriesToolTip"
                                                                           text={totalSearchedQueriesToolTipText}/></p>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white bg-danger">
                            <CardBody className="pb-0">
                                <h4 className="mb-0">{searchedPhrasesStats.length > 0 ? searchedPhrasesStats[0].term : null}</h4>
                                <p>Top searched phrase <StatefulToolTip position="left" arrow="center" id="topSearchedPhraseToolTip"
                                                                        text={topSearchedPhraseToolTipText}/></p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Most Frequently Searched Keywords
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped>
                                    <thead>
                                    <tr>
                                        <th>Keyword</th>
                                        <th>Count</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        searchedPhrasesStats.map((stat, i) =>
                                            (
                                                <tr key={i}>
                                                    <td>{stat.term}</td>
                                                    <td>{stat.count}</td>
                                                </tr>
                                            ))
                                    }
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Keywords With 0 Results
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped>
                                    <thead>
                                    <tr>
                                        <th>Keyword</th>
                                        <th>Count</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        noProductFoundStats.map((stat, i) =>
                                            (
                                                <tr key={i}>
                                                    <td>{stat.term}</td>
                                                    <td>{stat.count}</td>
                                                </tr>
                                            ))
                                    }
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Most Frequently Clicked Products
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped>
                                    <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Click</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        productClicksStats.map((stat, i) =>
                                            (
                                                <tr key={i}>
                                                    <td>{stat.title}</td>
                                                    <td>{stat.count}</td>
                                                </tr>
                                            ))
                                    }
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </div>
        )
    }
}

const mapStateToProps = storeState => ({
    productClicksCount: storeState.analytics.productClicksCount,
    redirectUrlsCount: storeState.analytics.redirectUrlsCount,
    searchedQueriesCount: storeState.analytics.searchedQueriesCount,
    searchedPhrasesStats: storeState.analytics.searchedPhrasesStats,
    noProductFoundStats: storeState.analytics.noProductFoundStats,
    productClicksStats: storeState.analytics.productClicksStats
});

const mapDispatchToProps = {
    getProductClickCount,
    getRedirectUrlsCount,
    getSearchedQueriesCount,
    getSearchedPhrasesStats,
    getNoProductFoundStats,
    getProductClicksStats
};

export default connect(mapStateToProps, mapDispatchToProps)(AutocompleteDashboard);

