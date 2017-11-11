import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { NavLanding } from './Nav.js'
import { Link } from 'react-router-dom'
import "./Login.css";
import firebase, { auth, provider } from './firebase.js';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      email: "",
      password: "",
      company: ""
    };

    this.googleLogin = this.googleLogin.bind(this);
    this.normalLogin = this.normalLogin.bind(this);
  }

  // Checks if all Components are filled with something
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  // Handles a State Change upon a user's input
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  // Functions for logging in through Google account
  googleLogin() {
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      this.setState({user});
      console.log(user);
    });
  }

  // Functions for logging in normally
  normalLogin() {

  }
  // Don't Refresh the page upon each state change
  handleSubmit = event => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
    .then()
    .catch(e => this.setState(e.message));
  }

  render() {
    return (
      <div className="Login">
        <NavLanding />
        <br /><br />

        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            className="Submit"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
          <Button
            block
            bsSize="large"
            className="GoogleLogin"
            onClick={this.googleLogin}
	         >Login with Google account</Button>
          <Link to='/register' id="LoginFooter">Register here!</Link>
        </form>


</div>
    );
  }
}

export { Login }
