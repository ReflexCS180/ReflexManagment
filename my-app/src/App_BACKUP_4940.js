<<<<<<< HEAD
import React, { Component } from 'react';

import './App.css';
// importing Board component
import Board from './Board.js'

//import '../public/vendor/bootstrap/css/bootstrap.min.css'
=======
import React, { } from 'react';
>>>>>>> frontend
import { Switch, Route, Link } from 'react-router-dom'
import { Dashboard, BoardTile } from './Dashboard.js'
import './App.css';
import './Landing.css';

<<<<<<< HEAD
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
=======
const Board = () => (
	<div>
		<h2>Boards</h2>
	</div>
)

const Landing = () => (
	<div>
		<noscript>
			You need to enable JavaScript to run this app.
		</noscript>

		<header class="masthead">
			<div class="container">
				<div class="intro-text">
					<div class="intro-lead-in">Management Tool for Software Engineers</div>
					<div class="intro-heading">Huddle</div>
					<a class="btn btn-xl js-scroll-trigger" href="./Dashboard">Enter Demo Here!</a>
				</div>
			</div>
		</header>

		<section id="services">
			<div class="container">
				<div class="row">
					<div class="col-lg-12 text-center">
						<h2 class="section-heading">Services</h2>
						<h3 class="section-subheading text-muted">A Software Management built by Software Engineers for Software Engineers</h3>
					</div>
				</div>
				<div class="row text-center">
					<div class="col-md-4">
						<span class="fa-stack fa-4x">
							<i class="fa fa-circle fa-stack-2x text-primary"></i>
							<i class="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
						</span>
						<h4 class="service-heading">Ship Products Faster!</h4>
						<p class="text-muted">Huddle is noted as one of the best software management application. Companies from all over the world has paised our services for being clean and practical.</p>
					</div>
					<div class="col-md-4">
						<span class="fa-stack fa-4x">
							<i class="fa fa-circle fa-stack-2x text-primary"></i>
							<i class="fa fa-laptop fa-stack-1x fa-inverse"></i>
						</span>
						<h4 class="service-heading">Responsive Design</h4>
						<p class="text-muted">Our team are all software engineers so we created minimalistic design to allows our user to quickly define, communicate, and resolve their issue. </p>
					</div>
					<div class="col-md-4">
						<span class="fa-stack fa-4x">
							<i class="fa fa-circle fa-stack-2x text-primary"></i>
							<i class="fa fa-lock fa-stack-1x fa-inverse"></i>
						</span>
						<h4 class="service-heading">Web Security</h4>
						<p class="text-muted">We have a dedicated security who are there 24/7 for support. Our security features are always updated to keep up with ever changing technogogly.</p>
					</div>
				</div>
			</div>
		</section>
	</div>
)

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
					<a class="nav-link" href="">Link</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="">Link</a>
				</li>
			</ul>
		</div>
	</nav>
)

const NavLanding = () => (
	<div>
	</div>
)

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Landing} />
			<Route exact path='/dashboard' component={Dashboard} />
		</Switch>
	</main>
)

const App = () => (
	<div>
		<Main />
	</div>
)

export { App, NavBoard };
>>>>>>> frontend
