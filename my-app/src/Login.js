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
      company: "",
      error: false, //extra 2 variables for handling & passing error's state and message
      errorMsg: "",
    };

    this.googleLogin = this.googleLogin.bind(this);
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

  //If there is error during login/register, pull out the error inside render
  validateErrorForm() {
    return this.state.error;
  }

  // Functions for logging in through Google account
  googleLogin() {
    auth.signInWithPopup(provider)
    .then((result) => {
      //console.log(result); //for debugging
      this.props.history.push('/dashboard');//redirecting the user to the dashboard
      //!!!!!! need to save the user's token HERE !!!!!!
    })
    .catch(e => {
      this.setState({error: true});
      if(e.code=="auth/wrong-password") this.setState({errorMsg: "Wrong password!"})
      else if(e.code=="auth/user-not-found") this.setState({errorMsg: "Email is not found!"})
      else this.setState({errorMsg: "Error code: "+e.code})
    });
  }

  // Don't Refresh the page upon each state change <--- basically the normalLogin, but will be executed from whoever specify type=submit
  handleSubmit = event => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((result) => {
      //console.log(result); //for debugging
      this.setState({error: true});
      this.props.history.push('/dashboard');//redirecting the user to the dashboard

    })
    .catch(e => {
      this.setState({error: true});
      if(e.code=="auth/wrong-password") this.setState({errorMsg: "Wrong password!"})
      else if(e.code=="auth/user-not-found") this.setState({errorMsg: "Email is not found!"})
      else this.setState({errorMsg: "Error code: "+e.code})
    }); //should be changed: display message somewhere between password bar & submit button
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

          {/*-- If there is any error message during the log in process, this will pop up */}
          { this.validateErrorForm() && <span style={{color: "red", fontSize: "0.8rem", marginBottom: "12px"}}>{this.state.errorMsg}</span> }

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
