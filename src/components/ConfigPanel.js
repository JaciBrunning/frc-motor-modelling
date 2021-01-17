import React from 'react';
import Configuration from './Configuration';
import { Tabs, Tab } from 'react-bootstrap';
import FAIcon from './jellybean/FontAwesome';
import SimConfig from './SimConfig';
class ConfigPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selected: 'sim' }
    this.setTab = this.setTab.bind(this);
  }

  setTab(k) {
    if (k === '_ADD') {
      this.props.addConfig();
    } else 
      this.setState({ selected: k });
  }

  render() {
    return <div>
      <Tabs activeKey={ this.state.selected} onSelect={k => this.setTab(k)} >
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
        <Tab key='_ADD' eventKey='_ADD' title={
          <FAIcon icon="plus" size="sm" />
        } />
      </Tabs>
    </div>
  }
}

export default ConfigPanel;