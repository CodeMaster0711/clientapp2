/* tslint:disable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    Col,
    Form,
    FormGroup,
    Input,
    Button
} from 'reactstrap';


export default class NewRedirectItem extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        (ReactDOM.findDOMNode(this.refs.keyword) as HTMLInputElement).focus();
    }

    render() {
        return (<Form onSubmit={this.onSubmit} className="form-horizontal">
                    <FormGroup row>
                        <Col sm="3">
                            <Input ref="keyword" type="text" placeholder="Keyword"/>
                        </Col>
                        <Col sm="5">
                            <Input ref="url" type="text" placeholder="Url"/>
                        </Col>
                        <Col sm="3">
                            <Button color="primary" size="sm">Save</Button>
                        </Col>
                    </FormGroup>
                </Form>);
    }

    onSubmit(event) {
        event.preventDefault();
        const keywordInput = (ReactDOM.findDOMNode(this.refs.keyword) as HTMLInputElement);
        const urlInput = (ReactDOM.findDOMNode(this.refs.url) as HTMLInputElement);
        this.props.addEvent({keyword: keywordInput.value, url: urlInput.value});
        keywordInput.value = '';
        urlInput.value = '';
    }
}