import React, { Component } from 'react';
import { NavBoard } from './Nav.js'; // Why do we need this import in Board.js?
import Column from './Column.js';
import firebase, { auth } from './firebase.js';
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
      boardName: '',
      user: [],
      columns: [],
      showBoardMenu: false
    }

    this.openMenu.bind(this);

  }

  componentWillMount() {
    // get columns from database
  }

  componentDidMount() {
    // changes title of browser tab
    document.title = "Huddle Board Page";
    document.body.style.backgroundColor = "#ffe070";

    // from dashboard
    auth.onAuthStateChanged((userAuth) => {
				if (userAuth) { //note that we cannot simply assign "user: userAuth" because object cannot be passed
				this.setState({user: userAuth});
				// fetches the object referencing the list of personalBoards of the current user
				var getData = firebase.database().ref('listOfBoards/'+this.props.match.params.boardID);

				// fetches a snapshot (kinda like a constant camera watching the database)
				// It will set the current State to update the newBoards with all the contents that the user
				// might have. From there it will push all the contents to this.state.newBoards so that
				// updateBoards() will create all the board components on the dashboards accordingly
				getData.on("value", function(snapshot) {
					var currentBoardObject = snapshot.val();

          this.setState({
            boardName: currentBoardObject['boardName']
          })

          var columns = currentBoardObject['columns'];
          var newColumnState = [];
          columns.forEach((column, index) => {
            column.cards = [];
            newColumnState.push({columnName: column.columnName, cards: column.cards});
          })

          this.setState({
            columns: newColumnState
          }, function() {
            this.updateColumns();
          })

				}.bind(this))
			}
		});

    // this.updateColumns();
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = "#fff";
  }

  updateColumns() {
		// look at this.state.newBoards, map the names to variable "boards"
		// basically creates an array? of objects with one <BoardTile> for each name in newBoards
    var stateColumns = this.state.columns;
    console.log("state columns: ", this.state.columns);

    // var stateColumns = this.state.columns;
    // console.log("stateColumns length: ", stateColumns.length);

    console.log("stateColumns: ", stateColumns);
    console.log("stateColumns length: ", stateColumns.length);
    var columns = stateColumns.map(function({columnName, cards}, index) {
      return(
          <Column
            columnName={columnName}
            user={this.state.user}
            cards={cards}
            key={index}
            addCardToColumn={(newCard, columnName) => this.addCardToColumn(newCard, columnName)}
            addCardComment={(newComment, cardUid, columnName) => this.addCardComment(newComment, cardUid, columnName)}
            changeCardDescription={(newDescription, cardUid, columnName) => this.changeCardDescription(
              newDescription, cardUid, columnName)}
            addCardDueDate={(newDueDate, cardUid, columnName) => this.addCardDueDate(newDueDate, cardUid, columnName)}
          />
        )
    }.bind(this));

    console.log("columns: ", columns);

		// new array to store each object in
		var myColumns = [];

		// for each item in "boards" variable, add it to the "myBoards" array
		columns.forEach(function(item, key) {
			myColumns.push(item);
		})
		// sets state.boardObjects to be "myBoards", new list of objects
		this.setState({ columnObjects: myColumns }, function() {
		    // prints new boardObjects state to console, AFTER update is done
		});
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

  openMenu(e) {
    e.preventDefault();
    this.setState({
      showBoardMenu: true,
    });
    console.log('showBoardMenu')
    console.log(this.showBoardMenu)
  };

  closeMenu(e) {
    e.preventDefault();
    this.setState({
      showBoardMenu: false
    })
  }

  render() {

    // console.log("state columns: ", this.state.columns);

    // var columns = this.state.columns.map(function({columnName, cards}, index) {
    //   return(
    //       <Column
    //         columnName={columnName}
    //         user={this.state.user}
    //         cards={cards}
    //         addCardToColumn={(newCard, columnName) => this.addCardToColumn(newCard, columnName)}
    //         addCardComment={(newComment, cardUid, columnName) => this.addCardComment(newComment, cardUid, columnName)}
    //         changeCardDescription={(newDescription, cardUid, columnName) => this.changeCardDescription(
    //           newDescription, cardUid, columnName)}
    //         addCardDueDate={(newDueDate, cardUid, columnName) => this.addCardDueDate(newDueDate, cardUid, columnName)}
    //       />
    //     )
    // }.bind(this));

    // console.log("columns: ", columns);

    return(
      <div>
        <NavBoard />
        { this.state.showBoardMenu ?
          <div>
          <button onClick={e =>this.closeMenu(e)} class="BoardMenu-close-button" >&times;</button>
          <BoardMenu />
          </div>
          :
          <button onClick={e => this.openMenu(e)} class="BoardMenu-open-button"> ... Show Menu </button>
        }

        <div class="container" id="board">
          <h3 class="mt-5 mb-4">{this.state.boardName}</h3>

          {/*TODO Resize column width for small screens*/}

          <div class="row">
            { this.state.columnObjects } {/* Prints <Column> objects, refer to 'var columns' above */}
          </div>
        </div>
      </div>
    )
  }
}

export { Board }; //
