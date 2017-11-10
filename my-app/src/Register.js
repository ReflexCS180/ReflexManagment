import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { NavLanding } from './Nav.js'
import { Link } from 'react-router-dom'
import "./Login.css";
import firebase, { auth, provider } from './firebase.js';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      company: ""
    };

    this.googleLogin = this.googleLogin.bind(this);
  }

  // Checks if all Components are filled with something
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0/* && this.state.company.length > 0*/;
  }

  // Handles a State Change upon a user's input */}
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  // Don't Refresh the page upon each state change
  handleSubmit = event => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then()
    .catch(e => this.setState(e.message));

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

  render() {
    return (
      <div className="Login">
        {/**/}
        <div id="particles-js"></div>
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
          <FormGroup controlId="company" bsSize="large">
            <ControlLabel>Company</ControlLabel>
            <FormControl
              value={this.state.company}
              onChange={this.handleChange}
              type="company"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            className="Submit"
            disabled={!this.validateForm()}
            type="submit"
          >
            Register
          </Button>
          <Button
            block
            bsSize="large"
            className="GoogleLogin"
            onClick={this.googleLogin}
           >Register/Login with Google account</Button>

          <Link to='/login' id="LoginFooter">Login here!</Link>
        </form>
      </div>
    );
  }
}

export { Register }
