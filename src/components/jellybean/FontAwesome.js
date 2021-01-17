import React from 'react';

class FAIcon extends React.PureComponent {
  static defaultProps = {
    icon_style: 'solid'
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
    if (this.props.spin) cls.push(`fa-spin`);
    return cls.join(" ")
  }

  render() {
    return <React.Fragment><i className={this.getClassName()} ></i> &nbsp; </React.Fragment>
  }
}

export default FAIcon;