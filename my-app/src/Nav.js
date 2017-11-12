import React from 'react';
import { Link } from 'react-router-dom'

const NavBoard = () => (
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
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <Link to="/profile" class="nav-link">Profile</Link>
        </li>
        <li class="nav-item">
          <Link to="/" class="nav-link">Logout</Link>
        </li>
      </ul>
    </div>
  </nav>
)

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
