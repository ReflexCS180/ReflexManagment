import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { NavLanding } from './Nav.js'
import { Link } from 'react-router-dom'
import request from "../node_modules/superagent/superagent";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      company: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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

  // Don't Refresh the page upon each state change
  handleSubmit = event => {
    event.preventDefault();
    request
    .post('http://localhost/userLogin')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({ username: this.state.email.value, password: this.state.password.value })
    .end(function(err, res){
    alert(err)
    });
  }

  render() {
    return (
      <div className="Login">
        <NavLanding />
        <br /><br />

        <form>
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
            disabled={!this.validateForm}
            type="submit"
            onClick={e => this.handleSubmit(e)}
          >
            Login
          </Button>

          <Link to='/register' id="LoginFooter">Register here!</Link>
        </form>
      </div>
    );
  }
}

export { Login }
