import React, { Component } from 'react';

export default class MenuWrap extends Component {
  constructor (props) {
    super(props);
    this.state = {
      hidden: false
    };
  }

  show() {
    this.setState({hidden : false});
  }

  render() {
    let style;
    if (this.state.hidden) {
      style = {display: 'none'};
    }

    return (
      <div style={style} className={this.props.side}>
        {this.props.children}
      </div>
    );
  }
}
