import React, { Component } from 'react'; // abstract component base

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: this.props.name
    }
  }

  render() {
    return(
      <div class="card">
        <div class="card-body">
          <p class="card-title">{this.state.cardName}</p>
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
