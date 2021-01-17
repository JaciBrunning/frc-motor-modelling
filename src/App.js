import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ConfigPanel from './components/ConfigPanel';
import './app.scss';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';
import * as Units from './framework/Units';
import SimControl from './components/SimControl';
import { motorFromConfig } from './framework/Motor';
import SimulationRunner from './framework/SimulationRunner';
import SimulationGraph from './components/SimulationGraph';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      config_counter: 1,
      configs: {},
      sim_config: {
        time: Units.s.make(5),
        dt: Units.ms.make(10)
      },
      simulationResults: null
    };
    this.addConfig = this.addConfig.bind(this);
    this.deleteConfig = this.deleteConfig.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
    this.duplicateConfig = this.duplicateConfig.bind(this);
    this.update = this.update.bind(this);
    this.runSimulation = this.runSimulation.bind(this);
  }

  componentDidMount() {
    // Add default config
    this.addConfig("Kit of Parts AM14U4");
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
            radius: Units.inch.make(6 / 2) // mm
          }
        }
      },
      config_counter: this.state.config_counter + 1
    });
  }

  deleteConfig(id) {
    this.setState({
      configs: _.omit(this.state.configs, id)
    });
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
    })
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
    });
  }

  update(key, newProps) {
    this.setState({
      [key]: {
        ...this.state[key],
        ...newProps
      }
    });
  }

  runSimulation() {
    let times = _.range(0, this.state.sim_config.time.toBase(), this.state.sim_config.dt.toBase());
    let results = {
      configs: {},
      time: times,
      voltage: {},
      speed: {},
      current: {},
      torque: {},
      velocity: {},
      acceleration: {},
      displacement: {}
    };

    Object.values(this.state.configs).forEach(cfg => {
      let motor = motorFromConfig(cfg.motor);
      let load  = { mass: cfg.load.mass.toBase(), radius: cfg.load.radius.toBase() };
      let voltages = times.map(t => cfg.motor.voltage.toBase())
      results.voltage[cfg.id] = voltages;
      results.configs[cfg.id] = { name: cfg.name, num: cfg.num };

      let runner = new SimulationRunner(times, voltages, motor, load);
      let result = runner.run();
      Object.keys(result).forEach(k => {
        results[k][cfg.id] = result[k];
      });
    });
    this.setState({ simulationResults: results });
  }

  render() {
    return <div>
      <center>
        <h2>Jaci's FRC Motor Selection Tool</h2>
      </center>
      <br />
      <Container>
        <Row className='mb-5'>
          <Col>
            <center>
              <SimControl onRun={ this.runSimulation }/>
            </center>
          </Col>
        </Row>
        <Row>
          <Col>
            <ConfigPanel 
              configs={this.state.configs}
              addConfig={ () => { this.addConfig() } }
              deleteConfig={ this.deleteConfig }
              updateConfig={ this.updateConfig }
              duplicateConfig={ this.duplicateConfig }
              sim_config={ this.state.sim_config }
              update={ this.update } />
          </Col>
          <Col>
            {
              this.state.simulationResults ? <div>
                <SimulationGraph
                  title="Displacement"
                  legend
                  configs={ this.state.simulationResults.configs }
                  x={ this.state.simulationResults.time }           xLabel="Time (s)"
                  y={ this.state.simulationResults.displacement }   yLabel="Displacement (m)"
                />
                <SimulationGraph
                  title="Velocity"
                  configs={ this.state.simulationResults.configs }
                  x={ this.state.simulationResults.time }           xLabel="Time (s)"
                  y={ this.state.simulationResults.velocity }       yLabel="Velocity (m/s)"
                />
                <SimulationGraph
                  title="Acceleration"
                  configs={ this.state.simulationResults.configs }
                  x={ this.state.simulationResults.time }           xLabel="Time (s)"
                  y={ this.state.simulationResults.acceleration }   yLabel="Acceleration (m/s^2)"
                />
                <SimulationGraph
                  title="Current"
                  configs={ this.state.simulationResults.configs }
                  x={ this.state.simulationResults.time }           xLabel="Time (s)"
                  y={ this.state.simulationResults.current }        yLabel="Motor Current (A)"
                />
              </div> : <h3> Run a simulation to get started! </h3>
            }
          </Col>
        </Row>
      </Container>
    </div>
  }
}

export default App;
