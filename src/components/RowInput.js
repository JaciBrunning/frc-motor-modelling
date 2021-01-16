import React from 'react';
import { Form, Col } from 'react-bootstrap';
import HelpIcon from './HelpIcon';

class RowInput extends React.PureComponent {
  static defaultProps = {
    md_lab: "5",
    md_input: "5",
    md_tooltip: "1",
    md_unit: "1",
    unit: undefined
  };

  render() {
    var { className, md_lab, label, md_input, unit, md_unit, md_tooltip, tooltip, children, ...controlProps } = this.props;
    return <Form.Row className={className}>
      {
        label ? 
          <Form.Label column="sm" md={ md_lab }>
            { label }:
          </Form.Label> : <React.Fragment />
      }
      <Col md={ md_input }>
        {
          children ? children : <Form.Control size="sm" {...controlProps} />
        }
      </Col>
      {
        unit ? 
          <Form.Label column="sm" md={ md_unit }>
            { unit }
          </Form.Label> : <Col md={md_unit} />
      }
      <Col md={ md_tooltip }>
        {
          tooltip ? 
            <HelpIcon tooltip={ tooltip } /> : <React.Fragment />
        }
      </Col>
    </Form.Row>
  }
}

export default RowInput;