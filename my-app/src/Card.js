import React, { Component } from 'react'; // abstract component base
import Modal from 'react-modal';
import CardModalContent from './CardModalContent.js'

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: this.props.cardName,
      columnName: this.props.columnName,
      cardBody: this.props.cardBody,
      modalIsOpen: false

    }
    console.log(" columnName in card ", this.props.columnName); // debugging

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
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
          {/* <p class="card-text">Short description text.</p> */}
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
