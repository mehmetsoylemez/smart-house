import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class MainNavigationbar extends Component {
  searchHouse(event) {
    event.preventDefault();
    let form = event.target;

    this.props.history.push({
      pathname: "/houses",
      searchKey: form.elements.searchKey.value
    });
  }

  render() {
    if (localStorage.getItem("user") === "YES") {
      return (
        <Navbar bg="light" expand="lg" style={{ padding: "25px" }}>
          <LinkContainer to="/home">
            <div>
              <Navbar.Brand>Smart House</Navbar.Brand>
            </div>
          </LinkContainer>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/houses">
                <Nav.Link>My Houses</Nav.Link>
              </LinkContainer>
              {!this.props.location.pathname.startsWith("/house/detail") ? (
                <LinkContainer to="/house/add">
                  <Nav.Link>Add House</Nav.Link>
                </LinkContainer>
              ) : (
                <LinkContainer
                  to={`/house/room/add/${
                    this.props.location.pathname.split("/")[3]
                  }`}
                >
                  <Nav.Link>Add Room</Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to="/activities">
                <Nav.Link>Recent Activity</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/alerts">
                <Nav.Link>Alerts</Nav.Link>
              </LinkContainer>
            </Nav>
            <Form inline onSubmit={e => this.searchHouse(e)}>
              <FormControl
                type="text"
                placeholder="House Name or Address"
                className="mr-sm-2"
                name="searchKey"
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>

              <Button
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  localStorage.setItem("user", "NO");
                  this.props.history.push("/login");
                }}
              >
                Sign Out
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      );
    } else {
      return <div />;
    }
  }
}

export default withRouter(MainNavigationbar);
