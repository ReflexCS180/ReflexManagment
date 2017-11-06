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
          <Link to="" class="nav-link">Link</Link>
        </li>
        <li class="nav-item">
          <Link to="" class="nav-link">Link</Link>
        </li>
      </ul>
    </div>
  </nav>
)

const NavLanding = () => (
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand js-scroll-trigger" href="">Huddle</a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fa fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <Link to="/" class="nav-link js-scroll-trigger">Link</Link>
            </li>
            <li class="nav-item">
              <Link to="/" class="nav-link js-scroll-trigger">Link</Link>
            </li>
            <li class="nav-item">
              <Link to="/" class="nav-link js-scroll-trigger">Link</Link>
            </li>
            <li class="nav-item">
              <Link to="/" class="nav-link js-scroll-trigger">Link</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
)

export { NavBoard, NavLanding };
