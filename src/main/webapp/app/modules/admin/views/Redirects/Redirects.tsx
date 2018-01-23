/* tslint:disable */
import * as React from 'react';
import RedirectItem from './RedirectItem';
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

export default class Redirects extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items
        };
        this.deleteItem = this.deleteItem.bind(this);
    }


    componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void {
        this.setState({
            items: nextProps.items
        });
    }

    deleteItem(item) {
        //alert(item.id);
        this.props.deleteEvent(item.id);
    }

    render() {
        let items = this.state.items.map((item) => {
            return <RedirectItem key={item.id} item={item} deleteItem={this.deleteItem}/>;
        });
        return (
            <Table responsive striped>
                <thead>
                </thead>
                <tbody>
                {items}
                </tbody>
            </Table>
        );
    }
}



