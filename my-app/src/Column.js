import React, { Component } from 'react'; // abstract component base
import Card from './Card.js'
import firebase, { auth } from './firebase.js';

// imports shortid package to create unique IDs.
var shortid = require('shortid');

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnName: this.props.columnName,
      //cards: [], // cards is an array of objects: {name, uid, description, comments, due date}
      cards: this.props.cards,
      nameError: false,
      user: this.props.user
    }
    this.deleteCard = this.deleteCard.bind(this)
  }

  componentDidMount() {
    // passing user from Board to column state
    this.setState({
      user: this.props.user
    })
  }

  // checkValidity is used to validate user input. Accepts alphanumeric or dashes or underscores
  checkValidity(nameToCheck) {
    if (nameToCheck.length > 0) {
      return(!(/[^A-Za-z0-9.!$+*_-\s]/.test(nameToCheck)));
    }
    else {
      return false;
    }
  }

  // 'onNewCardSubmit' is used specifically to add cards to the cardlist.
  onNewCardSubmit(cardName) {
    if (this.checkValidity(cardName)) {

      var newCard = {
        cardName: cardName,
        uid: shortid.generate(),
        cardDescription: '',
        cardComments: [],
        cardDueDate: ''
      }

      // this.state.cards.push(newCard);
      this.setState({nameError: false});

      // pass this up to Board
      this.props.addCardToColumn(newCard, this.state.columnName);
    }
    else {
      this.setState({nameError: true});
    }
  }

  // rename the card, passed up from CardModalContent and Card components
  renameCard(uid, newName) {
    var cardsTemp = this.state.cards;
    cardsTemp.forEach((card, index) => {
      if (card.uid === uid) {
        card.cardName = newName;
      }
    })

    this.setState({
      cards: cardsTemp
    })
    this.setState(this.state);
  }

  deleteCard(uid) {
    // create temp array of cards
    var cardsTemp = this.state.cards;

    // finds the index of the "uid" parameter in the array of cards
    var deleteCardIndex = -1;
    cardsTemp.forEach((card, index) => {
      if (card.uid === uid) {
        deleteCardIndex = index;
      }
    });

    // if deleteCardIndex was not overwritten, the uid was never found (error)
    if (deleteCardIndex === -1) {
      //console.log("Something went wrong when deleting card: ", uid);
    }

    // delete that value in the array
    cardsTemp.splice(deleteCardIndex, 1);

    // rewrite state with new array, then log that it was deleted
    this.setState({ cards: cardsTemp }, function() {
      //console.log("Deleted card: ", uid);
    });

    const boardUid = this.props.boardUid;

    var jeremyColumnName = this.props.columnName;
    // from dashboard
    auth.onAuthStateChanged((userAuth) => {
			if (userAuth) { //note that we cannot simply assign "user: userAuth" because object cannot be passed
				this.setState({user: userAuth});
				// fetches the object referencing the list of personalBoards of the current user
				var getData = firebase.database().ref('listOfBoards/'+boardUid);

				getData.on("value", function(snapshot) {
					var currentBoardObject = snapshot.val(); // Gives us the columnList object which contains a bunch of columns



          var columns = currentBoardObject['columns'];
          columns.forEach((column, index) => {
            if(column.columnName === jeremyColumnName) {
            if (column['cards']) {
              column['cards'].forEach((card, indexInner) => {
                if (card['uid'] === uid) {  // If we found the card to delete
                  var cardToDelete = firebase.database().ref('listOfBoards/'+boardUid+'/columns/'+index+"/cards/"+indexInner);
                  // console.log("PLEASE REMOVE THIS: " + 'listOfBoards/'+boardUid+'/columns/'+index+"/cards/"+indexInner)
                  cardToDelete.remove();
                }
              })
            } // end of inner if
          }
        })


				})
			}
		});

  }

  moveCard(newColumnName, cardData){

    let tmpColumnName = null
    let tmpCardData = []

    tmpColumnName = newColumnName
    tmpCardData = cardData

    // calls delete card from this component. deleteCard propogagetes to Board
    this.deleteCard(cardData.uid);
    // add card

    this.props.addCardToColumn(tmpCardData, tmpColumnName);
    // this.props.
  }

  addCardComment(newComment, cardUid) {
    // pass new comment info, uid of card, and column name to board
    this.props.addCardComment(newComment, cardUid, this.props.columnName);
  }


  changeCardDescription(newDescription, cardUid) {
    // pass up to board
    this.props.changeCardDescription(newDescription, cardUid, this.props.columnName);
  }

  addCardDueDate(newDueDate, cardUid) {
    this.props.addCardDueDate(newDueDate, cardUid, this.props.columnName);
  }

  // Renders list of cards onto a column.
  render() {
    // state here is a good thing. usually we are trying to use props
    var cards = this.state.cards.map(function({cardName, uid, cardDescription, cardComments, cardDueDate}, index) {
			return(
        <Card
          columnName={this.state.columnName} cardName={cardName} uid={uid} key={index}
          cardDescription={cardDescription} cardComments={cardComments} cardDueDate={cardDueDate}
          renameCard={(uid, newName) => this.renameCard(uid, newName)} user={this.props.user}
          deleteCard={ deleteCardUid => this.deleteCard(deleteCardUid)}
          moveCard={(newColumnName, cardData) => this.moveCard(newColumnName, cardData)}
          addCardComment={(newComment, cardUid) => this.addCardComment(newComment, cardUid)}
          changeCardDescription={(newDescription, cardUid) => this.changeCardDescription(newDescription, cardUid)}
          addCardDueDate={(newDueDate,cardUid) => this.addCardDueDate(newDueDate, cardUid)}
        />
      )
		}.bind(this)) // this means this this.

		return(
      <div class="col-2" >
        <div class="col-12 board-column">
          <div class="card-header">{this.state.columnName}</div>
          <div class="btn-group-vertical">

            {/* NewCardForm compenent is used to add new cards to a column*/}
            <NewCardForm onSubmit={ cardName => { this.onNewCardSubmit(cardName) }} />

            {/* Throw catch to user for bad card name */}
            { this.state.nameError && <span style={{fontSize: "0.9rem", marginBottom: "12px"}}>Valid characters: <span style={{color: "red"}}>A-z 0-9 _-+*$!.</span></span> }

            {/* Load all cards into column. Refer to line 37 */}
            { cards }
          </div>
        </div>
      </div>
		)
  }
}

class NewCardForm extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	state = { cardName: '' }

	onSubmit = (e) => {
		e.preventDefault(); // prevents default action of reloading the page on form submit
		this.setState({ cardName: '' }) // clears the form input field
		this.props.onSubmit(this.state.cardName); // calls prop onSubmit function, passing it the value in the input field
	}

	render() {

		return(
			<div id="new-card-form" class="mb-4">
				<form class="form-inline">
					<input type="text" class="form-control" value={this.state.cardName}
						onChange={e => this.setState({ cardName: e.target.value}) }
						ref={input => { this.newFormInput = input }} id="new-card-name" placeholder="Add new card" />
					<button onClick={e => this.onSubmit(e)} class="btn btn-primary">&#10145;</button>
				</form>
			</div>
		)
	}
}

export default Column; //
