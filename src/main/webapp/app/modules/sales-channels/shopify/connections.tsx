/* tslint:disable */ import * as React from 'react';
import {connect} from 'react-redux';
import {Table} from 'reactstrap';

import {userConnections} from '../../../reducers/sales-channels';

export interface IConnectionsPageProps {
  isFetching?: boolean;
  userConnections: Function;
  connections: any;
}

export class Connections extends React.Component<IConnectionsPageProps, undefined> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.userConnections();
  }

  render() {
    const {connections} = this.props;
    return (
      <div>
        <h2>Connections</h2>

        <div className="row">
          <div className="col-12">
            <Table>
              <thead
              >
              <tr>
                <th>Connection</th>
                <th>Details</th>
              </tr>
              </thead>
              <tbody>
              {Object.keys(connections).filter(connectionName => connections[connectionName].length > 0).map((connectionName, index) => (
                <tr key={index}>
                  <td>{connectionName}</td>
                  <td>
                    {connections[connectionName].map((obj, propIndex) => (
                      <div key={propIndex}>
                        <p>
                          <b> {obj.providerId} </b>
                          <b> {obj.providerUserId} </b>
                        </p>
                      </div>
                    ))

                    }
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  connections: storeState.salesChannels.connections,
  isFetching: storeState.salesChannels.loading
});

const mapDispatchToProps = {userConnections};

export default connect(mapStateToProps, mapDispatchToProps)(Connections);
