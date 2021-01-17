import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ConfigPanel from './components/ConfigPanel';
import './app.scss';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';
import * as Units from './framework/Units';
import SimControl from './components/SimControl';
import SimulationGraph from './components/SimulationGraph';
/* eslint-disable import/no-webpack-loader-syntax */
import SimulationWorker from 'comlink-loader!./framework/SimulationAdapter';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      config_counter: 1,
      configs: {},
      sim_config: {
        time: Units.s.make(5),
        dt: Units.ms.make(10),
        graphs: [
          {
            key: "displacement",
            title: "Displacement",
            unit: Units.m,
            enabled: true
          },
          {
            key: "velocity",
            title: "Velocity",
            unit: Units.mps,
            enabled: true
          },
          {
            key: "acceleration",
            title: "Acceleration",
            unit: Units.mpsps,
            enabled: true
          },
          {
            key: "current",
            title: "Current Total",
            unit: Units.A,
            enabled: true
          }
        ]
      },
      simulationResults: null,
      simLoading: false,
      simAuto: false
    };

    this.runSimulation();

    this.addConfig = this.addConfig.bind(this);
    this.deleteConfig = this.deleteConfig.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
    this.duplicateConfig = this.duplicateConfig.bind(this);
    this.update = this.update.bind(this);
    this.runSimulation = this.runSimulation.bind(this);
    this.triggerAutoSim = this.triggerAutoSim.bind(this);
    this.toggleAutoSim = this.toggleAutoSim.bind(this);
  }

  componentDidMount() {
    // Add default config
    this.addConfig("Kit of Parts AM14U4");
  }

  toggleAutoSim() {
    if (this.state.simAuto)
      this.setState({ simAuto: false });
    else
      this.setState({ simAuto: true }, this.triggerAutoSim);
  }

  triggerAutoSim() {
    if (this.state.simAuto)
      this.runSimulation();
  }

  addConfig(name) {
    let id = uuid();
    this.setState({
      configs: {
        ...this.state.configs,
        [id]: {
          id: id,
          name: name || ("Cfg #" + this.state.config_counter),
          num: this.state.config_counter,
          motor: {
            key: "CIM",
            voltage: Units.V.make(12.0),
            num: 4,
            reduction: 10.75
          },
          load: {
            mass: Units.kg.make(70),
            radius: Units.inch.make(6 / 2)
          }
        }
      },
      config_counter: this.state.config_counter + 1
    }, this.triggerAutoSim);
  }

  deleteConfig(id) {
    this.setState({
      configs: _.omit(this.state.configs, id)
    }, this.triggerAutoSim);
  }

  duplicateConfig(cfg) {
    let id = uuid();
    this.setState({
      configs: {
        ...this.state.configs,
        [id]: {
          ...cfg,
          id: id,
          name: cfg.name + " (Copy)",
          num: this.state.config_counter
        }
      },
      config_counter: this.state.config_counter + 1
    }, this.triggerAutoSim);
  }

  updateConfig(id, newProps) {
    this.setState({
      configs: {
        ...this.state.configs,
        [id]: {
          ...this.state.configs[id],
          ...newProps
        }
      }
    }, this.triggerAutoSim);
  }

  update(key, newProps) {
    this.setState({
      [key]: {
        ...this.state[key],
        ...newProps
      }
    }, this.triggerAutoSim);
  }

  runSimulation() {
    this.setState({ simLoading: true });
    const worker = new SimulationWorker();
    (new worker.SimulationAdapter(this.state.sim_config, this.state.configs))
      .then(a => a.run())
      .then(results => this.setState({ simulationResults: results, simConfigs: this.state.configs, simLoading: false }));
  }

  render() {
    return <div className='mx-5'>
      <center>
        <h2>Jaci's FRC Motor Selection Tool</h2>
      </center>
      <br />
      <Container fluid={true}>
        <Row>
          <Col>
            <center>
              <SimControl
                loading={ this.state.simLoading }
                onRun={ this.runSimulation }
                auto={ this.state.simAuto }
                onAutoToggle={ this.toggleAutoSim }/>
            </center>
          </Col>
        </Row>
        <Row>
          <Col className="config-col my-3">
            <ConfigPanel 
              configs={this.state.configs}
              addConfig={ () => { this.addConfig() } }
              deleteConfig={ this.deleteConfig }
              updateConfig={ this.updateConfig }
              duplicateConfig={ this.duplicateConfig }
              sim_config={ this.state.sim_config }
              update={ this.update } />
          </Col>
          <Col className="sim-col my-3">
            <Row>
              {
                this.state.simulationResults ? this.state.sim_config.graphs.filter(g => g.enabled).map((g, i) => (
                  <div className={ 'sim-graph' }>
                    <SimulationGraph
                      title={ g.title }
                      legend={ i === 0 }
                      configs={ this.state.simConfigs }
                      x={ this.state.simulationResults.time }
                      y={ this.state.simulationResults[g.key] }
                      xUnit={ this.state.sim_config.time.unit }
                      yUnit={ g.unit }
                      xLabel={ "Time" }
                      yLabel={ g.title } />
                  </div>
                )) : <h2> Run a simulation to get started! </h2>
              }
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  }
}

export default App;
