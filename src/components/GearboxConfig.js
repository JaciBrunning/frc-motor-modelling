import React from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import FAIcon from './jellybean/FontAwesome';

class GearboxConfig extends React.Component {
  static defaultProps = {
    round: 3
  };
  constructor(props) {
    super(props);
    this.state = {
      reduction: props.reduction,
      gearbox: props.gearbox
    };
    this.uuid = uuid();
  }

  updateParent = () => {
    if (this.props.onChange)
      this.props.onChange(this.state);
  }

  round = (v) => {
    return parseFloat(v.toFixed(this.props.round));
  }

  partialReduction = (stage) => {
    return stage[stage.length - 1] / stage[0];
  }

  updateReduction = () => {
    if (this.state.gearbox) {
      let reduction = this.state.gearbox.map(this.partialReduction).reduce((a, b) => a * b);
      this.setState({ reduction: reduction }, this.updateParent);
    } else {
      this.updateParent();
    }
  }

  setReduction = (reduction) => {
    this.setState({ reduction: reduction }, this.updateParent);
  }

  toggleCalc = () => {
    this.setState({
      gearbox: (this.state.gearbox === null) ? [[16,32], [16,50]] : null
    }, this.updateReduction);
  }

  addStage = () => {
    this.setState({
      gearbox: [ ...this.state.gearbox, [16, 50] ]
    }, this.updateReduction);
  }

  removeStage = (i) => {
    this.setState({
      gearbox: [ ...this.state.gearbox.filter( (x, j) => j !== i ) ]
    }, this.updateReduction);
  }

  updateStage = (stage, idx, value) => {
    let new_stages = [ ...this.state.gearbox ];
    new_stages[stage][idx] = value;
    this.setState({ gearbox: new_stages }, this.updateReduction);
  }

  render() {
    let simple = this.state.gearbox === null;
    return <Form className='gearbox-config'>
      <Form.Row>
        <Col>
          <Form.Switch
            id={`${this.uuid}-gearbox-switch`}
            label='Stage Calculator'
            checked={ !simple }
            onChange={ this.toggleCalc } />
        </Col>
        <Col>
          <Form.Control
            size='sm' 
            type='number' 
            step={0.01}
            disabled={ !simple }
            value={ this.round(this.state.reduction) }
            onChange={ e => this.setReduction(parseFloat(e.target.value)) } />
        </Col>
      </Form.Row>
      <hr />
      {
        simple ? <React.Fragment /> :
          <React.Fragment>
            {this.state.gearbox.map((stage, i) => <Form.Row key={i} className='my-3'>
              <Col>
                <h6>
                  Stage {i + 1}
                  &nbsp; &nbsp;
                  {
                    i === 0 ? <React.Fragment /> : 
                      <a className='text-danger' onClick={ () => this.removeStage(i) }>
                        <FAIcon icon='trash-alt' nospace/>
                      </a>                  }
                </h6>
              </Col>
              {
                stage.map((v, j) => (
                  <Col>
                    <Form.Control
                      key={`${i}-${j}`}
                      size='md' type='number'
                      min={1} step={1}
                      value={ v }
                      onChange={ e => this.updateStage(i, j, parseInt(e.target.value)) } />
                  </Col>
                ))
              }
              <Col>
                <Form.Control
                  size='md' type='number'
                  disabled
                  value={ this.round(this.partialReduction(stage)) } />
              </Col>
            </Form.Row>)}
            <Form.Row>
              <Button variant='outline-success' size='sm' onClick={ this.addStage }> 
                <FAIcon icon='plus' />
                Add Stage
              </Button>
            </Form.Row>
          </React.Fragment>
      }
    </Form>
  }
};

class GearboxConfigModal extends React.Component {
  render() {
    var { show, onClose, onSave, ...props } = this.props;
    return <Modal show={show} onHide={ onClose }>
      <Modal.Header closeButton>
        <Modal.Title> Configure Gearbox </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GearboxConfig {...props } onChange={ s => this.setState({ ...s }) } />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ onClose }> Cancel </Button>
        <Button variant="success" onClick={ () => { onClose(); onSave(this.state) } }> Save </Button>
      </Modal.Footer>
    </Modal>
  }
};

export default GearboxConfigModal;