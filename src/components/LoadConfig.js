import React from 'react';
import { Form } from 'react-bootstrap';
import UnitInput, { Units } from './jellybean/UnitInput';

class LoadConfig extends React.PureComponent {
  render() {
    return <Form>
      <UnitInput
        label='Load Mass'
        type='number'
        min={0}
        value={this.props.load.mass}
        onChange={ v => { this.props.update({ mass: v }) } }
        unit={Units.kg}
      />
      <UnitInput
        className='mt-2'
        label='Diameter'
        type='number'
        min={0}
        value={this.props.load.radius.with(r => r * 2)}
        onChange={ v => this.props.update({ radius: v.with(d => d / 2) }) }
        unit={Units.mm}
        tooltip='Diameter of the wheel, pulley, or moment arm that converts angular motion to linear motion (e.g. drivetrain wheels, elevator pulley).'
      />
      <UnitInput
        className='mt-2'
        label='Accel Offset'
        type='number'
        min={0}
        value={this.props.load.accel}
        onChange={ v => this.props.update({ accel: v }) }
        unit={Units.mpsps}
        tooltip='Acceleration acting on the load. For a drivetrain, this is likely 0. For an elevator, this is likely -9.81 (gravity, acting down).'
      />
    </Form>
  }
}

export default LoadConfig;