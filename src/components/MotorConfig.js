import React from 'react';
import { Motors, motorFromConfig } from '../framework/Motor';
import { ButtonGroup, Button, Form, Col } from 'react-bootstrap';
import { MathComponent } from 'mathjax-react';
import RowInput from './RowInput';

class MotorConfig extends React.Component {
  constructor(props) {
    super(props)
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

      <RowInput
        label="Applied Voltage"
        className="mb-2"
        type="number"
        value={ this.props.motor.voltage }
        onChange={ e => { this.props.update({ voltage: parseFloat(e.target.value) }) } }
        min={0}
        max={14}
        step={0.1}
        unit='V'
        tooltip='Desired applied voltage to the motor during the simulation.' />

      <RowInput
        label="Number of Motors"
        className="mb-2"
        type="number"
        value={ this.props.motor.num }
        onChange={ e => { this.props.update({ num: parseInt(e.target.value) }) } }
        min={1}
        step={1} />

      <RowInput
        label="Gearbox Reduction"
        className="mb-2"
        type="number"
        value={ this.props.motor.reduction }
        onChange={ e => { this.props.update({ reduction: parseFloat(e.target.value) }) } }
        min={0}
        step={0.1} />
      
      <hr />
      <div className="text-dark small">
        <center><i> Equivalent Motor Coefficients </i></center>
        <Form.Row>
          <Col>
            <MathComponent tex={ "R_{equiv} = " + this.getMotor().R().toFixed(4) + " \\Omega"  }/>
          </Col>
          <Col>
            <MathComponent tex={ "k_\\omega = " + this.getMotor().kw().toFixed(5) + "\\ \\frac{Vs}{rad}"  }/>
          </Col>
          <Col>
            <MathComponent tex={ "k_\\tau = " + this.getMotor().kt().toFixed(3) + "\\ \\frac{A}{Nm}"  }/>
          </Col>
        </Form.Row>
      </div>
    </Form>
  }
}

export default MotorConfig;