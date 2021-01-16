import React from 'react';
import Configuration from './Configuration';
import { Tabs, Tab, Button } from 'react-bootstrap';
import FAIcon from './FontAwesome';
import SimConfig from './SimConfig';
class ConfigPanel extends React.Component {
  render() {
    return <div>
      <p>
        <Button variant="success" size="sm" onClick={ this.props.addConfig }>
          <FAIcon icon="plus" /> Configuration
        </Button>
      </p>
      <Tabs>
        <Tab key='sim' eventKey='sim' title="Sim Config">
          <SimConfig
            cfg={this.props.sim_config}
            update={ (newProps) => this.props.update('sim_config', newProps) } />
        </Tab>
        { Object.values(this.props.configs).map(c => 
          <Tab key={c.id} eventKey={c.id} title={c.name}>
            <Configuration
              cfg={c}
              delete={ () => this.props.deleteConfig(c.id) }
              duplicate={ () => this.props.duplicateConfig(c) }
              update={ (newProps) => this.props.updateConfig(c.id, newProps) } />
          </Tab>) }
      </Tabs>
    </div>
  }
}

export default ConfigPanel;