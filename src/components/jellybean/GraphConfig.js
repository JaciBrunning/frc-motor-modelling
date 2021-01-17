import React from 'react';
import { Form, Col } from 'react-bootstrap';
import UnitSelector from './UnitSelector';
import HelpIcon from './HelpIcon';
class GraphConfig extends React.PureComponent {
  static defaultProps = {
    sm_lab: "5",
    sm_unit: "4",
    sm_tooltip: "1",
    cfg: undefined,
    onChange: undefined,
    tooltip: undefined
  }

  render() {
    var { className, sm_lab, sm_unit, sm_tooltip, cfg, tooltip, onChange, ...props } = this.props;
    return <Form.Row className={className}>
      <Col sm={ sm_lab }>
        <Form.Switch 
          id={ cfg.key + "_en" }
          label={ cfg.title }
          checked={ cfg.enabled }
          onChange={ e => onChange({ enabled: !cfg.enabled }) } />
      </Col>
      <Col sm={ sm_unit }>
        <UnitSelector value={ cfg.unit } onChange={ u => onChange({ unit: u }) } />
      </Col>
      <Col sm={ sm_tooltip }>
        {
          tooltip ? 
            <HelpIcon tooltip={ tooltip } /> : <React.Fragment />
        }
      </Col>
    </Form.Row>
  }
}

export default GraphConfig; 