import React from 'react';
import { Motors, motorFromConfig } from '../framework/Motor';
import { ButtonGroup, Button, Form, Col } from 'react-bootstrap';
import { MathComponent } from 'mathjax-react';

class MotorSelection extends React.Component {
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
      <Form.Row className="mb-2">
        <Form.Label column="sm" md="5">
          Applied Voltage:
        </Form.Label>
        <Col md="5">
          <Form.Control
            type="number" size="sm"
            value={ this.props.motor.voltage }
            step={0.1}
            min={1}
            max={14}
            onChange={ e => { this.props.update({ voltage: parseFloat(e.target.value) }) } } />
        </Col>
      </Form.Row>
      <Form.Row className="mb-2">
        <Form.Label column="sm" md="5">
          Number of Motors:
        </Form.Label>
        <Col md="5">
          <Form.Control
            type="number" size="sm"
            value={ this.props.motor.num }
            step={1}
            min={1}
            onChange={ e => { this.props.update({ num: parseInt(e.target.value) }) } } />
        </Col>
      </Form.Row>
      <Form.Row className="mb-2">
        <Form.Label column="sm" md="5">
          Gearbox Reduction:
        </Form.Label>
        <Col md="5">
          <Form.Control
            type="number" size="sm"
            value={ this.props.motor.reduction }
            min={0}
            step={0.1}
            onChange={ e => { this.props.update({ reduction: parseFloat(e.target.value) }) } } />
        </Col>
      </Form.Row>
      <hr />
      <Form.Row>
        <Col>
          <MathComponent tex={ "R_{equiv} = " + this.getMotor().R().toFixed(4) + " \\Omega"  }/>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <MathComponent tex={ "k_\\omega = " + this.getMotor().kw().toFixed(5) + "\\ \\frac{Vs}{rad}"  }/>
        </Col>
        <Col>
          <MathComponent tex={ "k_\\tau = " + this.getMotor().kt().toFixed(3) + "\\ \\frac{A}{Nm}"  }/>
        </Col>
      </Form.Row>
    </Form>
  }
}

export default MotorSelection;