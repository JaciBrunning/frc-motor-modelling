import React from 'react';

class FAIcon extends React.PureComponent {
  static defaultProps = {
    icon_style: 'solid',
    size: null
  };

  static styles = {
    regular: "far",
    solid: "fas"
  };

  getClassName = () => {
    let cls = [
      FAIcon.styles[this.props.icon_style],
      `fa-${this.props.icon}`,
      this.props.className
    ];
    if (this.props.size) cls.push(`fa-${this.props.size}`);
    return cls.join(" ")
  }

  render() {
    return <i className={this.getClassName()} > &nbsp; </i>
  }
}

export default FAIcon;