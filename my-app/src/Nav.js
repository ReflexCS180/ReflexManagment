import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase, { auth, provider } from './firebase.js';

class NavBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    };
  }

  loginOrLogout() {
    // returns links to login or logout based on user status
    if (this.state.user.length===0) { //if the user has NOT logged in before, this length should be 0 (empty). Will show: Login button
      return (
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <Link to="/login" class="nav-link">Login</Link>
          </li>
        </ul>
      )
    }
    else { //if length is not empty, the user should have already logged in. Will show: Logout and Profile buttons
      return (
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <Link to="/" onClick={this.logoutUser} class="nav-link">Logout</Link>
          </li>
          <li class="nav-item">
            <Link to="/profile" class="nav-link">Profile</Link>
          </li>
        </ul>
      )
    }
  }

  // tell firebase to log the user out
  logoutUser() {
    auth.signOut();
  }

  //Fetch "user" from firebase. Only needed so we may know whether the user has logged in or not
  componentDidMount() {
    auth.onAuthStateChanged((userAuth) => {
        if (userAuth) { //note that we cannot simply assign "user: userAuth" because object cannot be passed
          this.setState({user: userAuth});
          console.log(this.state.user);
        }
    });
  }

  render() {
    return(
      <nav class="navbar navbar-expand-md navbar-dark" id="board-page-nav">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse dual-collapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link to='/' class="nav-link">Home</Link>
            </li>
            <li class="nav-item">
              <Link to='/dashboard' class="nav-link">Dashboard</Link>
            </li>
            <li class="nav-item">
              <Link to='/board' class="nav-link">Boards</Link>
            </li>
          </ul>
        </div>
        <a class="navbar-brand d-flex mx-auto" href="">Huddle</a>
        <div class="navbar-collapse collapse dual-collapse">
          {/* returns a list of links based on whether the user is logged in or out
              refer to loginOrLogout function */}
          { this.loginOrLogout() }
        </div>
      </nav>
    )
  }
}

const NavLanding = () => (
  <nav class="navbar navbar-expand-md navbar-dark" id="board-page-nav">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-collapse collapse dual-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <Link to='/' class="nav-link">Home</Link>
        </li>
      </ul>
    </div>
    <a class="navbar-brand d-flex mx-auto " href="">Huddle</a>
    <div class="navbar-collapse collapse dual-collapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <Link to="/" class="nav-link">About</Link>
        </li>
        <li class="nav-item">
          <Link to="/" class="nav-link">Team</Link>
        </li>
        <li class="nav-item">
          <Link to="/" class="nav-link">Contact</Link>
        </li>
        <li class="nav-item">
          <Link to="/login" class="nav-link">Login</Link>
        </li>
      </ul>
    </div>
  </nav>
)

export { NavBoard, NavLanding };
