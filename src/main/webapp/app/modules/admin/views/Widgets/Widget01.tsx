/* tslint:disable */ import * as React from 'react';
import * as PropTypes from 'prop-types';
import {Card, CardBody, Progress} from "reactstrap";
import * as classNames from 'classnames';
import {mapToCssModules} from 'reactstrap/lib/utils';

const propTypes = {
  header: PropTypes.string,
  mainText: PropTypes.string,
  smallText: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  variant: PropTypes.string
};

export class WidgetProp {


  constructor() {
    this.mainText = "Lorem ipsum...";
    this.smallText = "Lorem ipsum dolor sit amet enim.";
    this.value = "25";
  }

  header?: string = "89.9%";
  mainText?: string = "Lorem ipsum...";
  smallText?: string = "Lorem ipsum dolor sit amet enim.";
  color?: string;
  value?: string = "25";
  children?: any;
  className?: string;
  cssModule?: any;
  variant?: string = "";
  icon?: string;
  invert?: boolean;
  dataBox?: Function = () => ({variant: "facebook", friends: "-", feeds: "-"});
  footer?: boolean;
  link?: string;
}


class Widget01 extends React.Component<WidgetProp, any> {


  constructor(props: WidgetProp, context: any) {
    super(props, context);
  }

  render() {
    const {className, cssModule, header, mainText, smallText, color, value, children, variant, ...attributes} = this.props;

    // demo purposes only
    const progress = {style: "", color: color, value: value};
    const card = {style: "", bgColor: ""};

    if (variant === "inverse") {
      progress.style = "progress-white";
      progress.color = "";
      card.style = "text-white";
      card.bgColor = 'bg-' + color;
    }

    const classes = mapToCssModules(classNames(className, card.style, card.bgColor), cssModule);
    progress.style = classNames("progress-xs my-3", progress.style);

    return (
      <Card className={ classes } {...attributes}>
        <CardBody>
          <div className="h4 m-0">{ header }</div>
          <div>{ mainText }</div>
          <Progress className={ progress.style } color={ progress.color } value={ progress.value }/>
          <small className="text-muted">{ smallText }</small>
          <div>{children}</div>
        </CardBody>
      </Card>
    )
  }
}


export default Widget01;
