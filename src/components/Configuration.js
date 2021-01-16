import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import SimpleAccordion from './SimpleAccordion';
import MotorSelection from './MotorSelection';
import { Motors } from '../framework/Motor';

class Configuration extends React.Component {
  constructor(props) {
    super(props);
    this.updateAndMerge = this.updateAndMerge.bind(this);
  }

  updateAndMerge(key, value) {
    this.props.update({ [key]: {
      ...this.props.cfg[key],
      ...value
    }});
  }

  render() {
    return <div>
      <Form.Row className="my-3">
        <Form.Label column="sm" md="auto">
          Config Name: 
        </Form.Label>
        <Col>
          <Form.Control 
            type="text" size="sm" 
            value={ this.props.cfg.name }
            onChange={ e => { this.props.update({ name: e.target.value }) } } />
        </Col>
      </Form.Row>
      <Form.Row className="mb-3">
        <Col>
          <Button 
            variant="primary" size="sm"
            onClick={ this.props.duplicate } > 
            Duplicate Configuration
          </Button>
        </Col>
        <Col>
          <Button 
            variant="danger" size="sm"
            onClick={ this.props.delete }> Delete Configuration </Button>
        </Col>
      </Form.Row>
      <SimpleAccordion title={
        "Motor (" +
          this.props.cfg.motor.num + "x " +
          Motors[this.props.cfg.motor.key].name + 
          " < " + this.props.cfg.motor.reduction + ")"}>
        <MotorSelection
          motor={ this.props.cfg.motor }
          update={ m => this.updateAndMerge('motor', m) } />
      </SimpleAccordion>
      
    </div>
  }
}

export default Configuration;