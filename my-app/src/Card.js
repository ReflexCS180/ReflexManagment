import React, { Component } from 'react'; // abstract component base
<<<<<<< HEAD
import firebase, { auth, provider } from './firebase.js';
=======
import Modal from 'react-modal';
import CardModalContent from './CardModalContent.js'
>>>>>>> origin/card-modals

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: this.props.cardName,
      columnName: this.props.columnName,
      modalIsOpen: false

    }
<<<<<<< HEAD

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
=======
    console.log(" columnName in card ", this.props.columnName); // debugging

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
>>>>>>> origin/card-modals
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }


  // Not sure why this only works if we use the function. Will need to investigate later.
  closeModal() {
    this.setState({modalIsOpen: false}, function() {
       this.setState({modalIsOpen: false});
      console.log(this.state.modalIsOpen);
      console.log(this.state.cardName);
    });
  }


  render() {
    return(
      <div class="card" onClick={this.openModal} > {/* 'onClick={() => alert('click')' Adds click event when a card is clicked.*/}
        <div class="card-body">
          <p class="card-title">{this.state.cardName}</p>
          <p class="card-text">Short description text.</p>
        </div>
        <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Example Modal"
      >
          <CardModalContent
          cardName={this.state.cardName}
          columnName={this.state.columnName}
          />
          <button onClick={this.closeModal}>Close
          </button>
        </Modal>
      </div>
    )
  }//
}

export default Card; //
