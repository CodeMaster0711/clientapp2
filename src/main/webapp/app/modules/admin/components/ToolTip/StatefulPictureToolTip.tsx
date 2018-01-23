/* tslint:disable */
import * as React from 'react';
import * as ToolTip from 'react-portal-tooltip';

export default class StatefulToolTip extends React.Component<any, any> {


    constructor(props) {
        super(props);
        this.state = {
            tooltipVisible: false
        };
    }

    render() {
        const {
            imgSrc,
            id,
            ...props,
        } = this.props;

        const style = {
            style: {
                background: '#fff',
                padding: 20,
                boxShadow: '5px 5px 3px rgba(0,0,0,.5)',
                width: '450px'
            },
            arrowStyle: {
                color: '#fff',
                borderColor: 'rgba(0,0,0,.4)'
            }
        };

        return (
            <span>
                <i id={id} className="fa fa-question-circle"
                   onMouseEnter={() => this.setState({tooltipVisible: true})}
                   onMouseLeave={() => this.setState({tooltipVisible: false})}/>
                <ToolTip {...props} active={this.state.tooltipVisible} parent={"#" + id} tooltipTimeout={10} style={style}>
                    <img src={`img/tooltippictures/${imgSrc}`} style={{width:400, height:400}} />
                </ToolTip>
            </span>
        );
    }
}