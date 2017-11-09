import React, { Component } from 'react'; // abstract component base
import Modal from 'react-modal';
class CardModalContent extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.cardName);
    console.log(this.props.columnName);
  }

  render() {
    return(
      <div id="modal-content">
        {/* Close Modal Top Right */}

        {/* Card Heading */}
        <div id="card-heading">
          {/* Name of Card -- Should Be Placed Top Left*/}
          <h1> <i class="fa fa-id-card-o" aria-hidden="true"></i> {this.props.cardName}</h1>
            {/*Location of Card Relative to Column*/}
            <p>in list {this.props.columnName} </p>
        </div>
        {/*Members List*/}
        <div id="card-member-list">
          <h3>Members</h3>
        </div>

        {/* Description */}
        <h3>Description</h3>
          <p>A long description of what this card represents. </p>

        {/* Comment */}
        <h3>Add Comment</h3>
        <input></input>
          {/* Save Button for Comment*/}
        {/* Activity */}

        {/* 'Add' Buttons */}
          {/*  Button Functions. Eg Memebrs, Lables, Due Date, Attachement */}

        {/* 'Actions' Buttons*/}
          {/* Button Funcionts. Eg Move, Copy, Subscribe, Archive */}
      </div>
    )
  }
}

export default CardModalContent;
