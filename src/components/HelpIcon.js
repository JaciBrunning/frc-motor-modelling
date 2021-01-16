import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import FAIcon from './FontAwesome';

class HelpIcon extends React.PureComponent {
  static defaultProps = {
    placement: 'top'
  };

  render() {
    var { tooltip, overlay, placement, ...props } = this.props;
    return <OverlayTrigger placement={placement} overlay={ overlay || <Tooltip> { tooltip } </Tooltip> } {...props} >
      <span><FAIcon icon="question-circle" size="sm" /></span>
    </OverlayTrigger>
  }
}

export default HelpIcon;