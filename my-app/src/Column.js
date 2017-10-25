import React, { Component } from 'react'; // abstract component base

//import '../public/vendor/bootstrap/css/bootstrap.min.css'
//import { Switch, Route, Link } from 'react-router-dom'  // switch from urls -- link to other pages

// importing Column component
import Card from './Card.js'

class Column extends Component {
  render() {
		return(
      <div class="btn-group-vertical">
        <Card/>
      </div>

		)
  }
}

// DERPIRCATED CODE MOVING TO CLASS STRUCTURE
// const Column = () => (
// 	<div>
// 		<h2>Column</h2>
// 	</div>
// )



export default Column; //
