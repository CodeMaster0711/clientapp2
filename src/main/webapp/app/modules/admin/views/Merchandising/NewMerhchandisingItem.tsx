/* tslint:disable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    Col,
    Form,
    FormGroup,
    Input
} from 'reactstrap';


export default class NewSynonymItem extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        (ReactDOM.findDOMNode(this.refs.itemName) as HTMLInputElement).focus();
    }

    render() {
        return (<Form onSubmit={this.onSubmit} className="form-horizontal">
                    <FormGroup row>
                        <Col sm="10">
                            <Input ref="itemName" type="text" placeholder="Add new association words for a product for more visibility in search. Ex: 1) warm,Sweater 2) Innovative,iPhone 3) Gift,doll"/>
                        </Col>
                    </FormGroup>
                </Form>);
    }

    onSubmit(event) {
        event.preventDefault();
        const input = (ReactDOM.findDOMNode(this.refs.itemName) as HTMLInputElement);
        const newItem = input.value;
        this.props.addEvent({newItem});
        input.value = '';
    }
}