import React, { Component } from 'react'; // abstract component base
import firebase, { auth, provider } from './firebase.js';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: this.props.name
    }

    this.handleChange = this.handleChange.bind(this); // Updates FBDB on change
    this.handleSubmit = this.handleSubmit.bind(this); // Updates FBDB on submit
  }

  handleSubmit(e){
    e.preventDefault();
    const cardRef = firebase.database().ref('Card');
    const card = {
      cardName: this.state.cardName,
      email: this.state.email
    }
    cardRef.push(card);
  }

  render() {
    return(
      <div class="card">
        <div class="card-body">
          <p class="card-title">{this.state.cardName}</p>
          <p class="card-text">Short description text.</p>
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
