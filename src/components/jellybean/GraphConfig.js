import React from 'react';
import { Form, Col } from 'react-bootstrap';
import UnitSelector from './UnitSelector';

class GraphConfig extends React.PureComponent {
  static defaultProps = {
    md_lab: "5",
    md_unit: "4",
    md_tooltip: "1",
    cfg: undefined,
    onChange: undefined,
    tooltip: undefined
  }

  render() {
    var { className, md_lab, md_unit, md_tooltip, cfg, tooltip, onChange, ...props } = this.props;
    return <Form.Row className={className}>
      <Col md={ md_lab }>
        <Form.Switch 
          id={ cfg.key + "_en" }
          label={ cfg.title }
          checked={ cfg.enabled }
          onChange={ e => onChange({ enabled: !cfg.enabled }) } />
      </Col>
      <Col md={ md_unit }>
        <UnitSelector value={ cfg.unit } onChange={ u => onChange({ unit: u }) } />
      </Col>
      <Col md={ md_tooltip }>
        {
          tooltip ? 
            <HelpIcon tooltip={ tooltip } /> : <React.Fragment />
        }
      </Col>
    </Form.Row>
  }
}

export default GraphConfig; 