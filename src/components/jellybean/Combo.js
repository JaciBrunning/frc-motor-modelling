import React from 'react';
import { Form } from 'react-bootstrap';

class Option extends React.PureComponent {
  render() {
    var {children, ...props} = this.props;
    return <option {...props}> { children } </option>;
  }
}

class Combo extends React.Component {
  static Option = Option;

  constructor(props) {
    super(props)
    this.change = this.change.bind(this);
    this.findOptionFor = this.findOptionFor.bind(this);
  }

  change(e) {
    if (this.props.onChange) {
      let val = e.target.value;
      let child = this.props.children.find(c => c.key === val);
      this.props.onChange(child.props.data);
    }
  }

  findOptionFor(v) {
    return this.props.children.find(c => c.props.data === v)
  }

  render() {
    var { children, value, onChange, ...props } = this.props;
    return <Form.Control size="sm" as="select" value={ this.findOptionFor(value).key } onChange={ this.change } {...props}>
      {
        children
      }
    </Form.Control>
  }
}

export default Combo;