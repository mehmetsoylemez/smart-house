import React, { Component } from "react";
import { Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class HomePage extends Component {
  render() {
    return (
      <LinkContainer to="/houses" style={{ cursor: "pointer" }}>
        <Image src="img/smartHousejpeg.jpeg" fluid />
      </LinkContainer>
    );
  }
}

export default HomePage;
