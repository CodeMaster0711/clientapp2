/* tslint:disable */
import * as React from 'react';

export default class SynonymItem extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(item) {
        this.props.deleteItem(item);
    }

    render() {
        return (
            <tr>
                <td>{this.props.item.synonyms}</td>
                <td><i onClick={() => this.onDelete(this.props.item)} className="fa fa-remove fa-lg mt-4"></i></td>
            </tr>
        );
    }
}