import React from 'react';
import { Button } from 'react-bootstrap';
import FAIcon from './jellybean/FontAwesome';

class SimControl extends React.PureComponent {
  render() {
    return <div>
      <Button variant='success' onClick={this.props.onRun}> <FAIcon icon='play' /> Run Simulation </Button>
    </div>
  }
}

export default SimControl;