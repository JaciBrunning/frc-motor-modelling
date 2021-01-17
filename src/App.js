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
import ExportWorker from 'comlink-loader!./framework/ExportAdapter';
import { KitOfParts, Elevator } from './framework/DefaultConfigs';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      config_counter: 1,
      configs: {},
      sim_config: {
        time: Units.s.make(3),
        dt: Units.ms.make(10),
        animate: true,
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
            title: "Current Draw",
            unit: Units.A,
            enabled: true
          },
          {
            key: "speed",
            title: "Angular Velocity",
            unit: Units.radps,
            enabled: false
          },
          {
            key: "torque",
            title: "Torque",
            unit: Units.Nm,
            enabled: false
          }
        ]
      },
      simulationResults: undefined,
      simConfigs: undefined,
      simLoading: false,
      simAuto: false,
      exportRunning: false
    };

    this.addConfig = this.addConfig.bind(this);
    this.deleteConfig = this.deleteConfig.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
    this.duplicateConfig = this.duplicateConfig.bind(this);
    this.update = this.update.bind(this);
    this.runSimulation = this.runSimulation.bind(this);
    this.triggerAutoSim = this.triggerAutoSim.bind(this);
    this.toggleAutoSim = this.toggleAutoSim.bind(this);
    this.exportData = this.exportData.bind(this);
  }

  componentDidMount() {
    // Add default config
    this.addConfig("KoP Drivetrain", KitOfParts(), () => {
      this.addConfig("Elevator", Elevator(), this.runSimulation);
    });
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

  addConfig(name, template, callback) {
    let id = this.state.config_counter;
    this.setState({
      configs: {
        ...this.state.configs,
        [id]: {
          ...template,
          id: id, 
          name: name
        }
      },
      config_counter: this.state.config_counter + 1
    }, callback || this.triggerAutoSim);
  }

  deleteConfig(id) {
    this.setState({
      configs: _.omit(this.state.configs, id)
    }, this.triggerAutoSim);
  }

  duplicateConfig(cfg, callback) {
    this.addConfig(cfg.name + " (Copy)", cfg, callback);
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

  runSimulation(callback) {
    // When triggered directly from a button or other sources, arguments can be objects...
    let actualCallback = typeof callback === 'function' ? callback : undefined;
    this.setState({ simLoading: true });
    const worker = new SimulationWorker();
    (new worker.SimulationAdapter(this.state.sim_config, this.state.configs))
      .then(a => a.run())
      .then(o => this.setState({ simulationResults: o.results, simConfigs: o.configs, simLoading: false }, actualCallback));
  }

  exportData() {
    // Run a simulation, then export
    this.setState({ exportRunning: true })
    this.runSimulation(() => {
      const worker = new ExportWorker();
      (new worker.ExportAdapter(this.state.simulationResults, this.state.sim_config, this.state.simConfigs))
        .then(a => a.run())
        .then(results => {
          Object.keys(results).forEach(name => {
            let hidden = document.createElement('a');
            hidden.target = '_blank';
            hidden.download = `${name}.csv`
            hidden.href = `data:text/csv;charset=utf-8,` + encodeURI(results[name])
            hidden.click();
            hidden.href = ''  // Clean that memory now, before it gets GC'd
          });
          this.setState({ exportRunning: false });
        });
    });
  }

  render() {
    return <div className='mx-5'>
      <center>
        <h2>Jaci's FRC Motor Selection Tool</h2>
      </center>
      <Container fluid={true}>
        <Row>
          <Col>
            <center>
              <SimControl
                loading={ this.state.simLoading }
                onRun={ this.runSimulation }
                auto={ this.state.simAuto }
                onAutoToggle={ this.toggleAutoSim }
                onExport={ this.exportData }
                exporting={ this.state.exportRunning } />
            </center>
          </Col>
        </Row>
        <Row>
          <Col className="config-col my-3">
            <ConfigPanel 
              configs={this.state.configs}
              addConfig={ () => { this.addConfig( `KoP ${this.state.config_counter}`, KitOfParts() ) } }
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
                      key={ g.key }
                      title={ g.title }
                      legend={ i === 0 }
                      animate={ this.state.sim_config.animate }
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
