import React from 'react';
import Combo from './Combo';

class UnitSelector extends React.PureComponent {
  static defaultProps = {
    unit: undefined,
    value: undefined,
    onChange: undefined
  };

  render() {
    let { value, onChange, unit, ...props } = this.props;
    return <Combo value={ value } onChange={ onChange } {...props}>
      {
        (unit || value).base.allVariants().map(u => <Combo.Option key={u.name} data={u}> { u.name } </Combo.Option>)
      }
    </Combo>
  }
}

export default UnitSelector;