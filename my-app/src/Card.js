import React, { Component } from 'react'; // abstract component base

//import '../public/vendor/bootstrap/css/bootstrap.min.css'
//import { Switch, Route, Link } from 'react-router-dom'  // switch from urls -- link to other pages
class Card extends Component {
  render() {
    return(
      <div class="card text-white bg-primary mb-3">
  {/* <div class="card-header">Header</div> */}
        <div class="card-body">
          <h4 class="card-title">Primary card title</h4>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
        </div>
      </div>
    )
  }//
}

// DERPIRCATED CODE MOVING TO CLASS STRUCTURE
// const Card = () => (
// 	<div>
// 		<h2>Card</h2>
// 	</div>
// )



export default Card; //
