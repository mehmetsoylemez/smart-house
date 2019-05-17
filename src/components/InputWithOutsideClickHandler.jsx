import React, { Component } from "react";

export default class InputWithOutsideClickHandler extends Component {
  handleClickOutside(evt) {
    if (this.refs.roomSummaryEdit !== evt.target) {
      this.props.handleOutsideClick(this.refs.roomSummaryEdit.value);
    }
    return true;
  }

  componentDidMount() {
    this.clickHandler = this.handleClickOutside.bind(this);
    document.addEventListener("click", this.clickHandler, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.clickHandler, true);
  }
  render() {
    return (
      <input
        type="text"
        className="form-control"
        ref="roomSummaryEdit"
        defaultValue={this.props.defaultValue}
        required
      />
    );
  }
}
