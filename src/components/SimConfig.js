import React from 'react';
import { Form } from 'react-bootstrap';
import UnitInput, { Units } from './jellybean/UnitInput';
import GraphConfig from './jellybean/GraphConfig';

class SimConfig extends React.Component {
  constructor(props) {
    super(props);
    this.updateGraph = this.updateGraph.bind(this);
  }

  updateGraph(key, changes) {
    let idx = _.findIndex(this.props.cfg.graphs, g => g.key == key);
    let new_graphs = [...this.props.cfg.graphs];
    new_graphs[idx] = { ...this.props.cfg.graphs[idx], ...changes };
    console.log(key, changes, idx, new_graphs)
    this.props.update({ graphs: new_graphs });
  }

  render() {
    return <Form>
      <h6 className="my-3"> Simulation Parameters </h6>
      <UnitInput
        className='my-3'
        label='Simulation Duration'
        type='number'
        min={0}
        value={ this.props.cfg.time }
        onChange={ v => { this.props.update({ time: v }) } }
        unit={Units.s}
      />
      <UnitInput
        className='my-3'
        label='Simulation Timestep'
        type='number'
        min={0.001}
        step={0.001}
        value={ this.props.cfg.dt }
        onChange={ v => { this.props.update({ dt: v }) } }
        tooltip='Simulation time interval (dt). The smaller, the finer the detail of the simulation.'
        unit={Units.s}
      />
      <hr />
      <h6 className="my-3"> Graphing </h6>
      {
        this.props.cfg.graphs.map(g => (
          <GraphConfig key={g.key} className={ 'my-2' } cfg={g} onChange={ v => this.updateGraph(g.key, v) } />
        ))
      }
    </Form>
  }
}

export default SimConfig;