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
      uid: this.props.uid,
      cardName: this.props.cardName,
      columnName: this.props.columnName,
      modalIsOpen: false,
      cardDescription: this.props.cardDescription,
      cardComments: this.props.cardComments,
      cardDueDate: this.props.cardDueDate
    }
    // cardComments is an array of objects like this: {username, comment, date}

    // console.log(" columnName in card ", this.props.columnName); // debugging
    // console.log(" uid of card: ", this.props.uid);
    // console.log("User from cards: ", this.props.user);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.deleteCard = this.deleteCard.bind(this);
  }

  /**
   * All functions related to Modal
   */
  openModal() {
    this.setState({modalIsOpen: true});
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

  // change cardName in state, call parent renameCard function
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

 // add a new comment to the card
  addCardComment(newCardComment) {
    // temp array of card comments
    var tempComments = this.state.cardComments;

    // create a javascript Date object with current date/time
    var date = new Date();
    var time = date.getTime();
    var displayTime = new Date(time);

    // create a new comment with current logged in user display name, the
    // comment text, and the current date/time
    var newComment = {
     username: this.props.user.displayName,
     comment: newCardComment,
     date: displayTime.toLocaleString()  // to do: get real time
    }

    this.props.addCardComment(newComment, this.props.uid)
    //  console.log(this.state.user);

    // unshift = push new comment to front of array instead of back
    //tempComments.unshift(newComment);

    // set state cardComments to the new temp variable with added comment
    // this.setState({
    //  cardComments: tempComments
    // });
  }

 // 'newCardDueDate' is an expected parameter.
  dueDateFromModalContent(newCardDueDate){
   this.setState({
     cardDueDate:newCardDueDate
   });

  }

  deleteCard() {
    // pass up to column
    this.props.deleteCard(this.state.uid);  // execute 'deleteCard' from parent component aka 'Column.js' component.
  }


  moveCardFromCardModal(columnName) {
    var cardData = {
      uid: this.state.uid,
      cardName: this.state.cardName,
      cardDescription: this.state.cardDescription,
      cardComments: this.state.cardComments,
      cardDueDate: this.state.cardDueDate
    }

    this.props.moveCard(columnName, cardData);
  }
  render() {
    return(
      <div class="card" onClick={this.openModal} > {/* 'onClick={() => alert('click')' Adds click event when a card is clicked.*/}
        <div class="card-body">
          <p class="card-title">{this.props.cardName}</p>
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
          cardName={this.props.cardName}
          columnName={this.props.columnName}
          renameCardFromModalContent={newName => this.renameCard(newName)}
          closeModal={this.closeModal}
          cardDescription={this.props.cardDescription}
          changeCardDescription={newDescription => this.changeCardDescription(newDescription)}
          cardComments={this.props.cardComments}
          addCardComment={newCardComment => this.addCardComment(newCardComment)}
          user={this.props.user}
          cardDueDate={this.props.cardDueDate}
          changeCardDueDate={cardDueDate => this.dueDateFromModalContent(cardDueDate) }   // this is how we pass variable control to child
          deleteCard={this.deleteCard}
          moveCardFromCardModal={columnName => this.moveCardFromCardModal(columnName)}
          />
          <button onClick={this.closeModal}>Close</button>
        </Modal>
      </div>
    )
  }
}


export default Card;
