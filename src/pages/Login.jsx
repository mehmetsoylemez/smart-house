import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";

class Login extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      redirectToReferrer: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem("user") === "YES") {
      this.setState({
        redirectToReferrer: true
      });
    } else {
      this.setState({
        redirectToReferrer: false
      });
    }
  }

  login = () => {
    localStorage.setItem("user", "YES");
    this.setState({
      redirectToReferrer: true
    });
  };

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/home" }
    };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return <LoginForm onClick={this.login} />;
  }
}

export default Login;
