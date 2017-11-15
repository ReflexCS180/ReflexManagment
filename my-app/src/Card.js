import React, { Component } from 'react'; // abstract component base
import Modal from 'react-modal';
import CardModalContent from './CardModalContent.js'

// set styles object to use for <Modal> in Card component
const modalStyles = {
  content : {
    top: '10%',
    left: '20%',
    right: '20%',
    bottom: '10%',
    backgroundColor: '#f5f5f5',
  }
};

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      cardName: this.props.cardName,
      columnName: this.props.columnName,
      modalIsOpen: false,
      cardDescription: 'A description of the card.',
      cardComments: [],
      cardDueDate: ''
    }
    // cardComments is an array of objects like this: {username, comment, date}

    console.log(" columnName in card ", this.props.columnName); // debugging
    console.log(" uid of card: ", this.props.uid);
    console.log("User from cards: ", this.props.user);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  /**
   * All functions related to Modal
   */
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
 //////////////////// End of Modal Functions

 renameCard(newName) {
   this.setState({
     cardName: newName,
   });

   this.props.renameCard(this.props.uid, newName);

 };

 changeCardDescription(newDescription) {
   this.setState({
     cardDescription: newDescription
   });

   // do we need to pass it up to column?
 }

 addCardComment(newCardComment) {
   var tempComments = this.state.cardComments;

   var date = new Date();
   var time = date.getTime();
   var displayTime = new Date(time);
   //console.log("Current time: ", displayTime.toLocaleString());


   var newComment = {
     username: this.props.user.displayName,
     comment: newCardComment,
     date: displayTime.toLocaleString()  // to do: get real time
   }

   console.log(this.state.user);

   tempComments.unshift(newComment);
   this.setState({
     cardComments: tempComments
   });

   // do we need to pass it up to column?
 }

 // 'newCardDueDate' is an expected parameter.
 dueDateFromModalContent(newCardDueDate){
   this.setState({
     cardDueDate:newCardDueDate
   });

 }

  render() {
    return(
      <div class="card" onClick={this.openModal} > {/* 'onClick={() => alert('click')' Adds click event when a card is clicked.*/}
        <div class="card-body">
          <p class="card-title">{this.state.cardName}</p>
          <p class="card-text">Short description.</p>
        </div>

        {/*Open Modal*/}
        <Modal
          style={modalStyles}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
          {/*Display Modal Content*/}
          <CardModalContent
          cardName={this.state.cardName}
          columnName={this.state.columnName}
          renameCardFromModalContent={newName => this.renameCard(newName)}
          closeModal={this.closeModal}
          cardDescription={this.state.cardDescription}
          changeCardDescription={newDescription => this.changeCardDescription(newDescription)}
          cardComments={this.state.cardComments}
          addCardComment={newCardComment => this.addCardComment(newCardComment)}
          user={this.props.user}
          cardDueDate={this.state.cardDueDate}
          changeCardDueDate={cardDueDate => this.dueDateFromModalContent(cardDueDate) }   // this is how we pass variable control to child
          />
          <button onClick={this.closeModal}>Close</button>
        </Modal>
      </div>
    )
  }
}


export default Card;
