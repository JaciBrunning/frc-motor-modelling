import React from 'react';
import { Form } from 'react-bootstrap';
import UnitInput, { Units } from './UnitInput';

class SimConfig extends React.Component {
  render() {
    return <Form>
      <UnitInput
        className='my-3'
        label='Simulation Duration'
        type='number'
        min={0}
        value={ this.props.cfg.time }
        onChange={ v => { this.props.update({ time: v }) } }
        unit={Units.s}
      />
      <UnitInput
        className='my-3'
        label='Simulation Timestep'
        type='number'
        min={0.001}
        step={0.001}
        value={ this.props.cfg.dt }
        onChange={ v => { this.props.update({ dt: v }) } }
        tooltip='Simulation time interval (dt). The smaller, the finer the detail of the simulation.'
        unit={Units.s}
      />
    </Form>
  }
}

export default SimConfig;