import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { Dashboard, BoardTile } from './Dashboard.js'
import './App.css';



const Board = () => (
	<div>
		<h2>Boards</h2>
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
