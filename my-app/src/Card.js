import React, { Component } from 'react'; // abstract component base
import Modal from 'react-modal';
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: this.props.name,
      modalIsOpen: false

    }
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

  closeModal() {
    this.setState({modalIsOpen: false}, function() {
      console.log(this.state.modalIsOpen);
      console.log(this.state.cardName);
    });
  }


  render() {
    return(
      <div class="card" onClick={() => this.openModal()} > {/* 'onClick={() => alert('click')' Adds click event when a card is clicked.*/}
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
          <h1>Force Modal</h1>
          <p>Modal cannot be closed when clicking the overlay area</p>
          <button onClick={this.closeModal}>Close Modal...</button>
        </Modal>
      </div>
    )
  }//
}

export default Card; //
