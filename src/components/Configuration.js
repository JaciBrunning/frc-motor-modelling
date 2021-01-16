import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import SimpleAccordion from './jellybean/SimpleAccordion';
import MotorConfig from './MotorConfig';
import { Motors } from '../framework/Motor';
import FAIcon from './jellybean/FontAwesome';
import LoadConfig from './LoadConfig';

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
            <FAIcon icon_style='regular' icon='copy' /> Duplicate Configuration
          </Button>
          &nbsp;
          <Button 
            variant="danger" size="sm"
            onClick={ this.props.delete }> 
            <FAIcon icon_style='regular' icon='trash-alt' /> Delete Configuration </Button>
        </Col>
      </Form.Row>

      <SimpleAccordion title="Load">
        <LoadConfig
          load={ this.props.cfg.load }
          update={ r => this.updateAndMerge('load', r) } />
      </SimpleAccordion>
      <br />
      <SimpleAccordion title={
        "Motor (" +
          this.props.cfg.motor.num + "x " +
          Motors[this.props.cfg.motor.key].name + 
          " < " + this.props.cfg.motor.reduction + ")"}>
        <MotorConfig
          motor={ this.props.cfg.motor }
          update={ m => this.updateAndMerge('motor', m) } />
      </SimpleAccordion>
      
    </div>
  }
}

export default Configuration;