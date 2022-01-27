import React from 'react';
import Motor, { Motors, motorFromConfig, MotorKey, calcReduction } from '../framework/Motor';
import type {MotorConfig} from '../framework/Motor';
import { ButtonGroup, Button, Form, Col } from 'react-bootstrap';
import { MathComponent } from 'mathjax-react';
import UnitInput, { Units } from './jellybean/UnitInput';
import HelpIcon from './jellybean/HelpIcon';
import FAIcon from './jellybean/FontAwesome';
import GearboxConfigModal from './GearboxConfig';
import { Spec } from 'immutability-helper';

type MotorConfigProps = {
  motor: MotorConfig;
  update: (s: Spec<MotorConfig>) => never;
};

type MotorConfigState = {
  showGearboxConfig: boolean;
};

class MotorConfigComponent extends React.Component<MotorConfigProps, MotorConfigState> {
  state = {
    showGearboxConfig: false
  };

  getMotor = () => {
    return motorFromConfig(this.props.motor);
  }

  render() {
    return <Form>
      <Form.Row className="mb-3">
        <Col>
          <ButtonGroup toggle className="flex-wrap">
            {
              Object.keys(Motors).map(key =>
                <Button 
                  key={key} 
                  variant={ this.props.motor.key === key ? "primary" : "outline-secondary" }
                  size="sm"
                  value={key} 
                  name="motor_selection"
                  onClick={ (e) => this.props.update({ key: { $set: ((e.currentTarget as HTMLButtonElement).value as MotorKey) } })}>
                  { Motors[key as MotorKey].name } 
                </Button>
              )
            }
          </ButtonGroup>
        </Col>
      </Form.Row>
      <hr />

      <UnitInput
        label="Applied Voltage"
        className="mb-2"
        type="number"
        value={ this.props.motor.voltage }
        onChange={ (v: number) => { this.props.update({ voltage: { $set: v } }) } }
        min={0}
        max={14}
        step={0.1}
        unit={Units.V}
        tooltip='Desired applied voltage to the motor during the simulation.' />

      <UnitInput
        label="Number of Motors"
        className="mb-2"
        type="number"
        value={ this.props.motor.num }
        onChange={ (v: number) => { this.props.update({ num: { $set: v } }) } }
        min={1}
        step={1}
        parse={parseInt} />

      <UnitInput
        label="Gearbox Reduction"
        className="mb-2"
        type="number"
        value={ calcReduction(this.props.motor.gearbox) }
        onChange={ (v: number) => { this.props.update({ gearbox: { $set: v } }) } }
        min={0}
        step={0.1}
        disabled={ (typeof this.props.motor.gearbox) !== "number" }
        unitContent={ 
          <Button variant='info' size='sm' onClick={ () => this.setState({ showGearboxConfig: true }) }>
             <FAIcon icon='cog' nospace/> 
          </Button> 
        } />

      <UnitInput
        label='Efficiency'
        className='mb-2'
        type='number'
        value={ this.props.motor.efficiency }
        onChange={ (v: number) => { this.props.update({ efficiency: { $set: v } }) } }
        min={0}
        max={100}
        step={0.5} />
      
      <GearboxConfigModal
        show={this.state.showGearboxConfig}
        onClose={ () => this.setState({ showGearboxConfig: false }) }
        onChange={(gb) => this.props.update({ gearbox: { $set: gb } })}
        gearbox={ this.props.motor.gearbox } />

      <hr />
      <div className="text-dark small">
        <div className="text-center"><i> Equivalent Motor Coefficients </i> <HelpIcon tooltip="Mathematical coefficients for a single motor model, after merging multiple motors and applying the gearbox reduction." /> </div>
        <Form.Row>
          <Col>
            <MathComponent tex={ "V = IR + k_\\omega \\omega" } />
          </Col>
          <Col>
            <MathComponent tex={ "I = k_\\tau \\tau" } />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col className='align-self-center'>
            <MathComponent tex={ "R_{equiv} = " + this.getMotor().R().toFixed(4) + " \\Omega"  }/>
          </Col>
          <Col className='align-self-center'>
            <MathComponent tex={ "k_\\omega = " + this.getMotor().kw().toFixed(5) + "\\ \\frac{Vs}{rad}"  }/>
          </Col>
          <Col className='align-self-center'>
            <MathComponent tex={ "k_\\tau = " + this.getMotor().kt().toFixed(3) + "\\ \\frac{A}{Nm}"  }/>
          </Col>
        </Form.Row>
      </div>
    </Form>
  }
}

export default MotorConfigComponent;