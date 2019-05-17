import React, { Component } from "react";
import { Navbar, Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <Container>
        <Navbar expand="lg" bg="light" fixed="bottom">
          <Navbar.Brand href="#" style={{ fontSize: "15px" }}>
            @2019 Copyrights:smarthouse.com
          </Navbar.Brand>
        </Navbar>
      </Container>
    );
  }
}

export default Footer;
