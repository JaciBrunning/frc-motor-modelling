import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import HelpIcon from './HelpIcon';
import * as Units from '../../framework/Units';
import UnitSelector from './UnitSelector';

class UnitInput extends React.PureComponent {
  static defaultProps = {
    sm_lab: 5,
    sm_input: 3,
    sm_unit: 4,
    unit: undefined,
    parse: parseFloat,
    round: 3
  };

  constructor(props) {
    super(props)
    this.changeValue = this.changeValue.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  changeValue(e) {
    let val = e.target.value;
    let n = this.props.parse(val);

    if (this.props.unit) {
      this.props.onChange(new Units.Measurement(this.props.value.unit, n));
    } else {
      this.props.onChange(n);
    }
  }

  getValue() {
    let val = this.props.unit ? this.props.value.value : this.props.value;
    if (this.props.parse === parseFloat)
      val = parseFloat(val.toFixed(this.props.round))   // Parsing again is a little trick to remove trailing zeros
    return val
  }

  render() {
    var { className, sm_lab, label, sm_input, sm_unit, sm_tooltip, tooltip, unit, parse, value, onChange, ...controlProps } = this.props;
    return <Form.Row className={className}>
      {
        label ? 
          <Form.Label column="sm" sm={ sm_lab }>
            { label }:
          </Form.Label> : <React.Fragment />
      }
      <Col sm={ sm_input }>
        <Form.Control size="sm" value={ this.getValue() } onChange={ this.changeValue } {...controlProps} />
      </Col>
      <Col sm={sm_unit}>
        <Row>
          <Col>
            {
              unit ? 
                <UnitSelector unit={ unit } value={ value.unit } onChange={ u => onChange(value.to(u)) } />
                : <React.Fragment />
            }
          </Col>
          <Col className='pl-0' xs='3'>
            {
              tooltip ? 
                <HelpIcon tooltip={ tooltip } /> : <React.Fragment />
            }
          </Col>
        </Row>
      </Col>
    </Form.Row>
  }
}

export { Units };
export default UnitInput;