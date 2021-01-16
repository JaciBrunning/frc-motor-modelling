import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ConfigPanel from './components/ConfigPanel';
import './app.scss';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      config_counter: 1,
      configs: {}
    };
    this.addConfig = this.addConfig.bind(this);
    this.deleteConfig = this.deleteConfig.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
    this.duplicateConfig = this.duplicateConfig.bind(this);
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
          motor: {
            key: "CIM",
            voltage: 12.0,
            num: 4,
            reduction: 10.75
          },
          load: {
            mass: 70,
            angle: 0
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
          name: cfg.name + " (Copy)"
        }
      }
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

  render() {
    return <div>
      <center>
        <h2>Jaci's FRC Motor Selection Tool</h2>
      </center>
      <br />
      <Container>
        <Row>
          <Col>
            <ConfigPanel 
              configs={this.state.configs}
              addConfig={ () => { this.addConfig() } }
              deleteConfig={ this.deleteConfig }
              updateConfig={ this.updateConfig }
              duplicateConfig={ this.duplicateConfig } />
          </Col>
          <Col> <h3> Graph </h3> </Col>
        </Row>
      </Container>
    </div>
  }
}

export default App;
