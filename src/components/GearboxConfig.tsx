import React from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import { calcPartialReduction, calcReduction, GearboxConfig, GearboxStageConfig } from '../framework/Motor';
import FAIcon from './jellybean/FontAwesome';
import update from 'immutability-helper';

type GearboxConfigProps = {
  round: number,
  gearbox: GearboxConfig,
  onChange: (gearbox: GearboxConfig) => void
};

class GearboxConfigComponent extends React.Component<GearboxConfigProps> {
  static defaultProps = {
    round: 3
  };

  uuid: string;

  constructor(props: GearboxConfigProps) {
    super(props);
    this.uuid = uuid();
  }

  round = (v: number) => {
    return parseFloat(v.toFixed(this.props.round));
  }

  toggleCalc = () => {
    this.props.onChange(
      (typeof this.props.gearbox === "number") ? 
        [[14, 50], [16, 48]] : 
        calcReduction(this.props.gearbox)
    );
  }

  addStage = () => {
    if (typeof this.props.gearbox !== "number") {
      this.props.onChange(
        [ ...this.props.gearbox, [16, 50] ]
      )
    }
  }

  removeStage = (i: number) => {
    if (typeof this.props.gearbox !== "number") {
      this.props.onChange(
        this.props.gearbox.filter( (x, j) => j !== i )
      );
    }
  }

  updateStage = (stage: number, idx: number, value: number) => {
    if (typeof this.props.gearbox !== "number") {
      this.props.onChange(
        update(this.props.gearbox, { [stage]: { [idx]: { $set: value } } })
      )
    }
  }

  render() {
    let { gearbox, onChange } = this.props;
    let simple = typeof gearbox === "number";


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
            value={ this.round(calcReduction(gearbox)) }
            onChange={ e => onChange(parseFloat(e.target.value)) } />
        </Col>
      </Form.Row>
      <hr />
      {
        simple ? <React.Fragment /> :
          <React.Fragment>
            {(gearbox as GearboxStageConfig[]).map((stage, i) => <Form.Row key={i} className='my-3'>
              <Col>
                <h6 className='align-self-center'>
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
                      type='number'
                      min={1} step={1}
                      value={ v }
                      onChange={ e => this.updateStage(i, j, parseInt(e.target.value)) } />
                  </Col>
                ))
              }
              <Col>
                <Form.Control
                  type='number'
                  disabled
                  value={ this.round(calcPartialReduction(stage)) } />
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

interface GearboxConfigModalProps extends GearboxConfigProps {
  show: boolean;
  onClose: () => void,
}

type GearboxConfigModalState = {
  gearbox: GearboxConfig
}

class GearboxConfigModal extends React.Component<GearboxConfigModalProps, GearboxConfigModalState> {
  static defaultProps = {
    round: 3
  };

  constructor(props: GearboxConfigModalProps) {
    super(props);
    this.state = { gearbox: props.gearbox };
  }

  render() {
    var { show, onClose, onChange, ...props } = this.props;
    return <Modal show={show} onHide={ onClose }>
      <Modal.Header closeButton>
        <Modal.Title> Configure Gearbox </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GearboxConfigComponent {...props } gearbox={ this.state.gearbox } onChange={ s => this.setState({ gearbox: s }) } />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ onClose }> Cancel </Button>
        <Button variant="success" onClick={ () => { onClose(); onChange(this.state.gearbox) } }> Save </Button>
      </Modal.Footer>
    </Modal>
  }
};

export default GearboxConfigModal;