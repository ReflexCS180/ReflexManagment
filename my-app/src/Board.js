import React, { Component } from 'react'; // abstract component base

// importing Column component
import Column from './Column.js'

//import '../public/vendor/bootstrap/css/bootstrap.min.css'
//import { Switch, Route, Link } from 'react-router-dom'  // switch from urls -- link to other pages

const Board = () => (
	<div>
		<h2>Boards</h2>
		<Column/>
	</div>
)



export default Board; //
