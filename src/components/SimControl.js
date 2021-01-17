import React from 'react';
import { Button } from 'react-bootstrap';
import FAIcon from './jellybean/FontAwesome';

class SimControl extends React.PureComponent {
  render() {
    return <div>
      <Button variant='success'
              onClick={this.props.onRun}
              disabled={this.props.loading}>
        <FAIcon icon={ this.props.loading ? 'cog' : 'play' } spin={ this.props.loading } /> Run Simulation
      </Button>
    </div>
  }
}

export default SimControl;