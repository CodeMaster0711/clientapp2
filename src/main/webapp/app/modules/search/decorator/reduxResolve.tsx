/* tslint:disable */ import * as React from 'react';

export function resolve(doResolve: Function) {

  return function decorate(DecoratingComponent) {

    class ResolveDecoratedComponent extends React.Component<any, any> {


      componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void {
        super.componentWillReceiveProps(nextProps, nextContext);
      }


      shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
        return super.shouldComponentUpdate(nextProps, nextState, nextContext);
      }

      componentWillMount() {
        const {resolver, getState} = this.context.store;
        doResolve(resolver, this.props, getState);
      }

      render() {
        return (<DecoratingComponent {...this.props} />);
      }
    }

    return ResolveDecoratedComponent;
  };
}
