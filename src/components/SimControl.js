import React from 'react';
import { Button } from 'react-bootstrap';
import FAIcon from './jellybean/FontAwesome';

class SimControl extends React.PureComponent {
  render() {
    return <div>
      <Button
        variant={ this.props.loading ? 'info' : 'success' }
        onClick={ this.props.onRun }
        disabled={ this.props.loading || this.props.auto }>
        <FAIcon
          icon={ this.props.loading ? 'cog' : 'play' }
          spin={ this.props.loading } />
        Run Simulation
      </Button>

      <Button
        className='mx-2'
        onClick={ this.props.onAutoToggle }
        variant={ this.props.auto ? 'warning' : 'primary' }>
        <FAIcon
          icon='sync'
          spin={ this.props.auto } />
        {
          this.props.auto ? 'Stop Auto Sim' : 'Start Auto Sim'
        }
      </Button>
    </div>
  }
}

export default SimControl;