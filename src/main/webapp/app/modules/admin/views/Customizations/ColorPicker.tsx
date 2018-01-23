/* tslint:disable */
import * as React from 'react';

import {SketchPicker} from 'react-color';


export default class ColorPicker extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            color: this.props.color,
        };
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker})
    };

    handleClose = () => {
        this.setState({displayColorPicker: false})
    };

    handleChangeComplete = (color) => {
        this.setState({color: color.hex});
        this.props.onChangeComplete(this.props.id, color);
    };


    render() {

        const styles = {

            color: {
                width: '36px',
                height: '20px',
                borderRadius: '2px',
                background: `${ this.state.color}`,
            },
            swatch: {
                padding: '1px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute' as 'absolute',
                zIndex: 2
            },
            cover: {
                position: 'fixed' as 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px'
            },
        };

        return (

            <div>
                <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color}/>
                </div>
                {this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose}/>
                    <SketchPicker color={this.state.color} onChange={this.handleChangeComplete}/>
                </div> : null}

            </div>

        );
    }
}




