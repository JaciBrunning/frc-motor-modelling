import React from 'react';
import Configuration from './Configuration';
import { Tabs, Tab, Button } from 'react-bootstrap';
import FAIcon from './FontAwesome';
class ConfigPanel extends React.Component {
  render() {
    return <div>
      <p>
        <Button variant="success" size="sm" onClick={ this.props.addConfig }>
          <FAIcon icon="plus" /> Configuration
        </Button>
      </p>
      {
        Object.keys(this.props.configs).length === 0 ? <i> No configs :( </i> :
          <Tabs>
            { Object.values(this.props.configs).map(c => 
              <Tab key={c.id} eventKey={c.id} title={c.name}>
                <Configuration
                  cfg={c}
                  delete={ () => this.props.deleteConfig(c.id) }
                  duplicate={ () => this.props.duplicateConfig(c) }
                  update={ (newProps) => this.props.updateConfig(c.id, newProps) } />
              </Tab>) }
          </Tabs>
      }
    </div>
  }
}

export default ConfigPanel;