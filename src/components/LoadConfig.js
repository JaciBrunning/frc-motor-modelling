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
        label='Wheel / Pulley Diameter'
        type='number'
        min={0}
        value={this.props.load.radius.with(r => r * 2)}
        onChange={ v => this.props.update({ radius: v.with(d => d / 2) }) }
        unit={Units.mm}
        tooltip='Diameter of the wheel, pulley, or moment arm that converts angular motion to linear motion (e.g. drivetrain wheels, elevator pulley).'
      />
    </Form>
  }
}

export default LoadConfig;