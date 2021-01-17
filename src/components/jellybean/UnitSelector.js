import React from 'react';
import Combo from './Combo';

class UnitSelector extends React.PureComponent {
  static defaultProps = {
    unit: undefined,
    value: undefined,
    onChange: undefined
  };

  render() {
    return <Combo value={ this.props.value } onChange={ this.props.onChange }>
      {
        (this.props.unit || this.props.value).base.allVariants().map(u => <Combo.Option key={u.name} data={u}> { u.name } </Combo.Option>)
      }
    </Combo>
  }
}

export default UnitSelector;