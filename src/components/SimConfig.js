import React from 'react';
import { Form } from 'react-bootstrap';
import RowInput from './RowInput';

class SimConfig extends React.Component {
  render() {
    return <Form>
      <RowInput
        className='my-3'
        label='Simulation Duration'
        type='number'
        min={0}
        value={ this.props.cfg.time }
        onChange={ e => { this.props.update({ time: parseFloat(e.target.value) }) } }
        unit='s'
      />
      <RowInput
        className='my-3'
        label='Simulation Timestep'
        type='number'
        min={0.001}
        step={0.001}
        value={ this.props.cfg.dt }
        onChange={ e => { this.props.update({ dt: parseFloat(e.target.value) }) } }
        unit='s'
        tooltip='Simulation time interval (dt). The smaller, the finer the detail of the simulation.'
      />
    </Form>
  }
}

export default SimConfig;