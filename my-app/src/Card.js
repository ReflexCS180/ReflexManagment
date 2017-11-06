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
      <div class="card" onClick={() => alert('click')} > {/* 'onClick={() => alert('click')' Adds click event when a card is clicked.*/}
        <div class="card-body">
          <p class="card-title">{this.state.cardName}</p>
          <p class="card-text">Short description text.</p>
        </div>
      </div>
    )
  }//
}

export default Card; //
