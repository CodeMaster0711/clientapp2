/* tslint:disable */
import * as React from 'react';
import {Container, Row, Col, Button, Input, InputGroup, InputGroupAddon, InputGroupButton} from 'reactstrap';

class PaymentDeclined extends React.Component<any, any> {


    private shopName = '';

    componentWillMount() {
        const shop = location.hash.substr(1).substr(location.hash.substr(1).indexOf('shopName=')).split('&')[0].split('=')[1];
        this.shopName = `https://${shop}/admin/apps`;
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
              <span className="clearfix">
                <h4 className="pt-3">Declined the charge by mistake?</h4>
                <p className="text-muted float-left">We hope you declined the charge by mistake. No worries, you can still accept the charge. Simply go to your <a
                    href={this.shopName}>shopify admin</a> -> app section -> click on SearchIt App link.</p>
              </span>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default PaymentDeclined;
