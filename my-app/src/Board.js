import React, { Component } from 'react';
import { NavBoard } from './Nav.js'; // Why do we need this import in Board.js?
import Column from './Column.js';
import firebase, { auth, provider } from './firebase.js';
import './Board.css';

const BoardMenu = () => (
  <div id="rightMenu">
    <div class="container">
      <div class="mt-5 mb-4" id="topic">
        <h5>
          Menu
        </h5>
      </div>

      {/* TODO Create teammate Components check Issue: 42 */}
      <div class="mt-5 mb-4" id="topic">
        <h5>
          Teammates
        </h5>
      </div>

      <div class="mt-5 mb-4" id="topic">
        <h5>Settings</h5>

      </div>


      {/* TODO Create an activity tracker --- might be demarcated, Check Issue: 43 */}
      <div class="mt-5 mb-4" id="topic">
        <h5>
          Activity Tracker
        </h5>
      </div>

    </div>
  </div>
)

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardName: "Board Name", /* TODO: Add feature to match board name with selected board*/
      user: [],
      columns: [
        {columnName: "Backlog", cards: []},
        {columnName: "In Progress", cards: []},
        {columnName: "Completed", cards: []}
      ]
    }

    // check if user is logged in, set state "user" if true
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) { //note that we cannot simply assign "user: userAuth" because object cannot be passed
            //console.log("user is logged in");
            this.setState({
              user: firebase.auth().currentUser
            }, function() {
              //console.log("user from board constructor: ", this.state.user);
            })
      }
      else {
        console.log("user is not logged in");
      }
    });

  }

  componentWillMount() {
    // get columns from database
  }

  componentDidMount() {
    // changes title of browser tab
    document.title = "Huddle Board Page";
    document.body.style.backgroundColor = "#ffe070";

    // 'this.props.match.params.boardID' is from the URL
    // if url is huddlereflex.me/board/abc, params.boardID = 'abc'
    if (this.props.match.params.boardID !== undefined) {
      // TODO: get name of board from firebase with this uid: this.props.match.params.boardID
      this.setState({boardName: this.props.match.params.boardID});
    }
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = "#fff";
  }

  addCardToColumn(newCard, columnName) {
    // search through list of columns for 'columnName'
    // unshift newCard into that column
    console.log("from Board.js: ", newCard);

    this.state.columns.forEach((column, index) => {
      if (column.columnName === columnName) {
        console.log("before: ", column.cards);
        column.cards.unshift(newCard);
        console.log("after: ", column.cards);
      }
    })
    this.setState(this.state);
  }

  addCardComment(newComment, cardUid, columnName) {
    // find the column
    // find the card
    // add the comment to the card (unshift)

    this.state.columns.forEach((column, index) => {
      column.cards.forEach((card, index2) => {
        if (card.uid === cardUid) {
          card.cardComments.unshift(newComment)
        }
      })
    })

    this.setState(this.state);
  }

  changeCardDescription(newDescription, cardUid, columnName) {
    this.state.columns.forEach((column, index) => {
      column.cards.forEach((card, index2) => {
        if (card.uid === cardUid) {
          card.cardDescription = newDescription;
        }
      })
    })

    this.setState(this.state);
  }

  addCardDueDate(newDueDate, cardUid, columnName) {
    this.state.columns.forEach((column,index) => {
      column.cards.forEach((card,index2) => {
        if(card.uid === cardUid) {
          card.cardDueDate = newDueDate
        }
      })
    })
    this.setState(this.state);
  }

  render() {
    var columns = this.state.columns.map(function({columnName, cards}, index) {
      return(
        <Column
          columnName={columnName}
          user={this.state.user}
          cards={cards}
          addCardToColumn={(newCard, columnName) => this.addCardToColumn(newCard, columnName)}
          addCardComment={(newComment, cardUid, columnName) => this.addCardComment(newComment, cardUid, columnName)}
          changeCardDescription={(newDescription, cardUid, columnName) => this.changeCardDescription(
            newDescription, cardUid, columnName)}
          addCardDueDate={(newDueDate, cardUid, columnName) => this.addCardDueDate(newDueDate, cardUid, columnName)}
        />
      )
    }.bind(this));

    return(
      <div>
        <NavBoard />
        <BoardMenu />

        <div class="container" id="board">
          <h3 class="mt-5 mb-4">{this.state.boardName}</h3>

          {/*TODO Resize column width for small screens*/}

          <div class="row">
            { columns } {/* Prints <Column> objects, refer to 'var columns' above */}
          </div>
        </div>
      </div>
    )
  }
}

export { Board }; //
