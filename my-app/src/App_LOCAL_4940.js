import React, { Component } from 'react';

import './App.css';
// importing Board component
import Board from './Board.js'

//import '../public/vendor/bootstrap/css/bootstrap.min.css'
import { Switch, Route, Link } from 'react-router-dom'

const Dashboard = () => (
  <div class="container">
    <h3 class="mt-5 mb-4"><i class="fa fa-user-o mr-2" aria-hidden="true"></i> Personal Boards</h3>
    <div class="row" id="personal-boards">
      <div class="col-3">
        <button class="btn btn-primary btn-block btn-lg mb-5 project-btn">Hello</button>
      </div>
      <div class="col-3">
        <div id="new-board-modal">
          <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <p><strong>Create a New Board</strong></p>
          <form>
            <div class="form-group">
              <label for="new-board-name">New Board Name</label>
              <input type="text" id="new-board-name" class="mb-3 form-control" placeholder="Board name"/>
              <small id="new-board-name-info" class="form-text text-muted">You can change this later on.</small>
            </div>
            <button type="button" class="btn btn-secondary" id="create-board-btn">Create Board</button>
          </form>
        </div>
        <button class="btn btn-secondary btn-block btn-lg mb-5 project-btn" id="new-board-btn">Create New Board</button>
      </div>
    </div>
  </div>
)

const Landing = () => (
  <div>
    <h2>Welcome to Huddle!</h2>
  </div>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/dashboard' component={Dashboard} />
      <Route exact path='/board' component={Board} />
    </Switch>
  </main>
)

const Header = () => (
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
    <a class="navbar-brand d-flex mx-auto" href="#">Huddle</a>
    <div class="navbar-collapse collapse dual-collapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
      </ul>
    </div>
  </nav>
)

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

export default App;
