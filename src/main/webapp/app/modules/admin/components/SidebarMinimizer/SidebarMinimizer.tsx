/* tslint:disable */ import * as React from 'react';

class SidebarMinimizer extends React.Component<any, any> {

  sidebarMinimize() {
    document.body.classList.toggle('sidebar-minimized');
  }

  brandMinimize() {
    document.body.classList.toggle('brand-minimized');
  }

  render() {
    return (
      <button className="sidebar-minimizer" type="button" onClick={(event) => { this.sidebarMinimize(); this.brandMinimize() }}></button>
    )
  }
}

export default SidebarMinimizer;
