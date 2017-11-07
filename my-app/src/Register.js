import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { NavLanding } from './Nav.js'
import { Link } from 'react-router-dom'
import "./Login.css";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      company: ""
    };
  }

  // Checks if all Components are filled with something
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0 && this.state.confirmPassword.length > 0 && this.state.company.length > 0;
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
            disabled={!this.validateForm()}
            type="submit"
          >
            Register
          </Button>

          <Link to='/login' id="LoginFooter">Login here!</Link>
        </form>
      </div>
    );
  }
}

export { Register }
