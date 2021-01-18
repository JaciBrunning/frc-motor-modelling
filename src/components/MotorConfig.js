import React from 'react';
import { Motors, motorFromConfig } from '../framework/Motor';
import { ButtonGroup, Button, Form, Col } from 'react-bootstrap';
import { MathComponent } from 'mathjax-react';
import UnitInput, { Units } from './jellybean/UnitInput';
import HelpIcon from './jellybean/HelpIcon';
import FAIcon from './jellybean/FontAwesome';
import GearboxConfigModal from './GearboxConfig';

class MotorConfig extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showGearboxConfig: false
    }
    this.getMotor = this.getMotor.bind(this);
  }

  getMotor() {
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
                  onClick={ (e) => this.props.update({ key: e.currentTarget.value }) }> 
                  { Motors[key].name } 
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
        onChange={ v => { this.props.update({ voltage: v }) } }
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
        onChange={ v => { this.props.update({ num: v }) } }
        min={1}
        step={1}
        parse={parseInt} />

      <UnitInput
        label="Gearbox Reduction"
        className="mb-2"
        type="number"
        value={ this.props.motor.reduction }
        onChange={ v => { this.props.update({ reduction: v }) } }
        min={0}
        step={0.1}
        disabled={ this.props.motor.gearbox !== null }
        unitContent={ 
          <Button variant='info' size='sm' onClick={ () => this.setState({ showGearboxConfig: true }) }>
             <FAIcon icon='cog' nospace/> 
          </Button> 
        } />
      
      <GearboxConfigModal
        show={this.state.showGearboxConfig}
        onClose={ () => this.setState({ showGearboxConfig: false }) }
        onSave={ (s) => { s ? this.props.update(s) : null } }
        reduction={ this.props.motor.reduction }
        gearbox={ this.props.motor.gearbox } />

      <hr />
      <div className="text-dark small">
        <center><i> Equivalent Motor Coefficients </i> <HelpIcon tooltip="Mathematical coefficients for a single motor model, after merging multiple motors and applying the gearbox reduction." /> </center>
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

export default MotorConfig;