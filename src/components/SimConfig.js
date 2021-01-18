import React from 'react';
import { Form, Col } from 'react-bootstrap';
import UnitInput, { Units } from './jellybean/UnitInput';
import GraphConfig from './jellybean/GraphConfig';
import SimpleAccordion from './jellybean/SimpleAccordion';
import _ from 'lodash';
class SimConfig extends React.Component {
  constructor(props) {
    super(props);
    this.updateGraph = this.updateGraph.bind(this);
  }

  updateGraph(key, changes) {
    let idx = _.findIndex(this.props.cfg.graphs, g => g.key == key);
    let new_graphs = [...this.props.cfg.graphs];
    new_graphs[idx] = { ...this.props.cfg.graphs[idx], ...changes };
    this.props.update({ graphs: new_graphs });
  }

  render() {
    return <Form>
      <SimpleAccordion title="Simulation Parameters" className='my-3'>
        <UnitInput
          className='mb-3'
          label='Simulation Duration'
          type='number'
          min={0}
          value={ this.props.cfg.time }
          onChange={ v => { this.props.update({ time: v }) } }
          unit={Units.s}
        />
        <UnitInput
          label='Simulation Timestep'
          type='number'
          min={0.001}
          step={0.001}
          value={ this.props.cfg.dt }
          onChange={ v => { this.props.update({ dt: v }) } }
          tooltip='Simulation time interval (dt). The smaller, the finer the detail of the simulation.'
          unit={Units.s}
        />
      </SimpleAccordion>
      <SimpleAccordion title="Graphing Controls" className='my-3'>
        <Form.Row className='mb-3'>
          <Col>
            <Form.Switch
              id='graph-animate-switch'
              label='Animate?'
              checked={ this.props.cfg.animate }
              onChange={ e => { this.props.update({ animate: !this.props.cfg.animate }) } } />
          </Col>
        </Form.Row>
        {
          this.props.cfg.graphs.map(g => (
            <GraphConfig key={g.key} className={ 'mt-2' } cfg={g} onChange={ v => this.updateGraph(g.key, v) } />
          ))
        }
      </SimpleAccordion>
    </Form>
  }
}

export default SimConfig;