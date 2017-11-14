import React, { Component } from 'react';
import { NavBoard } from './Nav.js';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import firebase, { auth, provider } from './firebase.js';

// use shortid.generate() to generate a unique ID for our boards
var shortid = require('shortid');

class BoardTile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showTools: false,
      showRenameForm: false
		}

		// binds certain functions so the "this" keyword knows what to refer to
		this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
		this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
		this.delete = this.delete.bind(this);
		this.rename = this.rename.bind(this);
    this.renameSubmit = this.renameSubmit.bind(this);
	}

	onMouseEnterHandler() {
		// set the showTools state to true when this function is triggered:
		// when cursor enters the board tile
		this.setState({ showTools: true });
	}

	onMouseLeaveHandler() {
		// set the showTools state to false when this function is triggered:
		// when cursor leaves the board tile div (including board tile and tool bar)
		this.setState({ showTools: false });
	}

	rename() {
    // when called, passes the name of the button to the dashboard component
    // to be renamed
    this.setState({ showRenameForm: !this.state.showRenameForm });
    //this.props.onRename(this.props.uid, this.props.name);
	}

  renameSubmit = (newName) => {
    this.props.onRename(this.props.uid, newName);
    this.setState({ showRenameForm: false });
  }

	delete() {
		// when called, passes the name of the button to the dashboard component
		// to be deleted
		this.props.onDelete(this.props.uid);
	}

	render() {
		// create a string to link to particular board
		// ex: board/myfirstboard if the name of the board is "myfirstboard"
		var boardLink = "board/" + this.props.uid;

		// if state.showTools is true, then render BoardTileTools component
		// if not, only render the main button
		return(
			<div class="col-12 col-sm-6 col-lg-3 board-tile" onMouseLeave={this.onMouseLeaveHandler}>
				<Link to={boardLink} className="btn btn-primary btn-lg btn-block project-btn board-btn"
					onMouseEnter={this.onMouseEnterHandler}>
					{this.props.name}
				</Link>
        {this.state.showRenameForm && <RenameForm onSubmit={newName => {this.renameSubmit(newName)}} />}
        {this.state.showTools && <BoardTileTools onRename={this.rename} onDelete={this.delete} renameShow={this.state.showRenameForm} />}
			</div>
		)
	}
}

class BoardTileTools extends Component {
	constructor(props){
		super(props);
		this.rename = this.rename.bind(this);
		this.delete = this.delete.bind(this);
    this.state = {
      renameFormOpen: false,
      renameButtonTitle: "Rename Board",
      renameFormClasses: "fa fa-pencil"
    }
	}

  componentDidMount() {
    // ternary operator: if renameShow is true, execute 1st line, else execute 2nd line
    (this.props.renameShow)
      ? this.setState({ renameButtonTitle: "Close Rename Form", renameFormClasses: "fa fa-times"})
      : this.setState({ renameButtonTitle: "Rename Board", renameFormClasses: "fa fa-pencil"});
  }

	rename() {
		// opens rename form when rename button is clicked
    this.props.onRename();
    this.setState({ renameFormOpen: !this.state.renameFormOpen }, function() {
      // ternary operator: if renameShow is true, execute 1st line, else execute 2nd line
      (this.props.renameShow)
        ? this.setState({ renameButtonTitle: "Close Rename Form", renameFormClasses: "fa fa-times"})
        : this.setState({ renameButtonTitle: "Rename Board", renameFormClasses: "fa fa-pencil"});
    });

	}

	share() {
		// you will see this console.log text when the share button is clicked.
		// actual share functionality not implemented yet
		// purpose: share with another user
		console.log("I want to share");
	}

	unlink() {
		// you will see this console.log text when the share button is clicked.
		// actual unlink functionality not implemented yet
		// purpose: unlink yourself from the board, so you don't see it anymore,
		// but it's not deleted or removed from anyone else's dashboard
		console.log("I want to unlink");
	}

	delete() {
		// call onDelete function of the parent BoardTile when delete button is clicked
		this.props.onDelete();
	}

	render() {
		return(
			<div class="dashboard-board-tools">
				<BoardTileToolButton onClick={this.rename} title={this.state.renameButtonTitle} classes={this.state.renameFormClasses}/>
				<BoardTileToolButton onClick={this.share} title={"Share Board"} classes={"fa fa-share-alt"}/>
				<BoardTileToolButton onClick={this.unlink} title={"Unlink From Board"} classes={"fa fa-chain-broken"}/>
				<BoardTileToolButton onClick={this.delete} title={"Delete Board"} classes={"fa fa-trash"}/>
			</div>
		)
	}
}

class BoardTileToolButton extends Component {
	render() {
		return(
			<button class="tool-btn" onClick={this.props.onClick} title={this.props.title}>
				<i className={this.props.classes} aria-hidden="true"></i>
			</button>
		)
	}
}

class RenameForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
		this.state = {
      renameInput: '',
      invalidInput: false
    }
	}

	componentDidMount() {
		// is called as soon as this component is rendered.
		// adds focus to the input box so the user doesn't have to click on it to type
		this.newFormInput.focus();
	}

  // fat arrow function, pass "e" variable into the function
  // "e" variable is the "event", in this case a click event
  onSubmit = (e) => {
    e.preventDefault();
    if (this.checkValidity(this.state.renameInput)) {
      this.setState({ invalidInput: false });
      this.props.onSubmit(this.state.renameInput);
    }
    else {
      this.setState({ invalidInput: true });
      console.log("Invalid rename: ", this.state.renameInput);
    }
    // this.props.onSubmit(this.state.renameInput);
  }

  checkValidity(nameToCheck) {
		// returns true if name contains only letters, numbers, spaces, dashes, underscores
		// returns false if name contains any other special characters
		return(!(/[^A-Za-z0-9_-\s]/.test(nameToCheck)));
	}

  render() {
    return(
      <div id="rename-board-form">
        <form>
          { this.state.invalidInput &&
            <label htmlFor="rename-board-name" id="invalidInputLabel">
              No special characters except <strong>-</strong> and <strong>_</strong>.
            </label>
          }
          <input type="text" class="form-control" value={this.state.renameInput}
            onChange={e => this.setState({ renameInput: e.target.value}) }
            ref={input => { this.newFormInput = input }} id="rename-board-name"
            placeholder="Rename Your Board" />
            <button onClick={e => this.onSubmit(e)} id="submit-rename-btn">
              <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
        </form>
      </div>
    )
  };
}

// This is the button to create a new board; only used once
class NewBoardTile extends Component {
	constructor(props) {
		super(props);
		this.state = {isOpen: false}; // state isOpen refers to the NewBoardForm
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit = (boardName) => {
		// when called,
		this.props.onSubmit(boardName);
	};

	toggleForm() {
		// flips the state value (true->false, false->true)
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	// render the "create new board" tile.
	// if this.state.isOpen == true, also render the "new board form"
	render() {
		return(
			<div class="col-12 col-sm-6 col-lg-3">
				{this.state.isOpen && <NewBoardForm show={this.state.isOpen} onClose={this.toggleForm.bind(this)} onSubmit={boardName => { this.onSubmit(boardName) }} />}
				<button class="btn btn-secondary btn-block btn-lg mb-5 project-btn" id="new-board-btn" onClick={this.toggleForm.bind(this)}>Create New Board</button>
			</div>
		)
	}
}

class NewBoardForm extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = { boardName: '' }
	}

	componentDidMount() {
		// is called as soon as this component is rendered.
		// adds focus to the input box so the user doesn't have to click on it to type
		this.newFormInput.focus();
	}

	checkValidity(nameToCheck) {
		// returns true if name contains only letters, numbers, spaces, dashes, underscores
		// returns false if name contains any other special characters
		return(!(/[^A-Za-z0-9_-\s]/.test(nameToCheck)));
	}

	onSubmit = (e) => {
		e.preventDefault(); // prevents default action of reloading the page on form submit
		if (this.checkValidity(this.state.boardName)) {
			this.props.onSubmit(this.state.boardName.trim()); // calls prop onSubmit function, passing it the value in the input field
			this.props.onClose();	// when submitting the form, this calls the "onClose" prop method of "NewBoardTile.toggleform()"
		}
		else {
			// the name is not valid, turns the warning text red so they notice it more
			console.log("This name is not valid: ", this.state.boardName, "\nPlease remove special characters.")
			this.warningText.style.color = "red";
		}
	}

	render() {
		if(!this.props.show) {
			return null;
		}

		return(
			<div id="new-board-form" class="col-12">
				<button class="close-button" onClick={this.props.onClose.bind(this)}>&times;</button>
				<form>
					<h5 style={{borderBottom: "1px solid black", display: "inline-block"}}>Start A New Board</h5>
					<p>Use this simple form to create a new board. You can always change the name and other settings later.</p>
					<div class="form-group">
						<p ref={warning => { this.warningText = warning }} style={{fontSize: "0.75rem"}}>Please use only letters, numbers, dashes and underscores.</p>
						<label htmlFor="new-board-name">New Board Name:</label>
						<input type="text" class="form-control" value={this.state.boardName}
							onChange={e => this.setState({ boardName: e.target.value}) }
							ref={input => { this.newFormInput = input }} id="new-board-name" placeholder="Name Your Board" />
					</div>
					<button onClick={e => this.onSubmit(e)} class="btn btn-primary">Create Board</button>
				</form>
			</div>
		)
	}
}

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formOpen: false,
			newBoard: false,

			newBoards: [],       // newBoards is an array of {boardName, uid} (for convenience)
			boardObjects: [],
			userID: null,
			userName: null,
			user: []

		};

		// boardObjects is an array of objects that contain the names and React DOM info of each boardObjects
		// note: the board tiles are actually rendered from boardObjects, not from newBoards
		// newBoards is used for easy updates. boardObjects is then updated based on the names in newBoards

    // when connected to database, here we can send user id to database
    // in order to retrieve json file with list of boards, then set state
	}

	componentDidMount() {
		// on component load: changes tab name and updates state.boardObjects
		document.title = "Huddle Dashboard";
		auth.onAuthStateChanged((userAuth) => {
				if (userAuth) { //note that we cannot simply assign "user: userAuth" because object cannot be passed
				this.setState({user: userAuth});
				console.log(this.state.user);
			}
		});
		this.updateBoards();
	}

	onNewBoardSubmit = (boardName) => {
		// when newBoardForm is submitted: updates state, adds new board name,
		// then updates state.boardObjects
		this.setState({ newBoard: true });
		this.state.newBoards.push({name: boardName, uid: shortid.generate()});
		this.updateBoards();
	}

	updateBoards() {
		// look at this.state.newBoards, map the names to variable "boards"
		// basically creates an array? of objects with one <BoardTile> for each name in newBoards
		var boards = this.state.newBoards.map(function({name, uid}, index) {
			return(<BoardTile name={name} key={index} uid={uid} onDelete={this.deleteBoard.bind(this, uid)}
        onRename={(uid, newName) => {this.renameBoard(uid, newName)}}/>)
		}.bind(this));

		// new array to store each object in
		var myBoards = [];

		// for each item in "boards" variable, add it to the "myBoards" array
		boards.forEach(function(item, key) {
			myBoards.push(item);
		})

		// sets state.boardObjects to be "myBoards", new list of objects
		this.setState({ boardObjects: myBoards }, function() {
			// prints new boardObjects state to console, AFTER update is done
			console.log(this.state.boardObjects);
		});
	}

	deleteBoard(uid) {
		// creates new variable boardNamesTemp to do all the delete work in
		var boardNamesTemp = this.state.newBoards;

		// finds the index of the "uid" parameter in the array
		var deleteTileIndex = -1;
    boardNamesTemp.forEach((board, index) => {
      if (board.uid === uid) {
        deleteTileIndex = index;
      }
    });
    if (deleteTileIndex === -1) {
      console.log("Something went wrong with the ID's in deleteBoard");
      console.log("uid not found: ", uid);
    }

		// removes the corresponding element from the array
		boardNamesTemp.splice(deleteTileIndex, 1);

		// sets state.newBoards to be equal to new array with deleted item
		this.setState({ newBoards: boardNamesTemp }, function() {
			// prints the name of the deleted board AFTER state is set
			console.log("Deleted Board: ", uid);
		});

		// updates state.boardObjects based on the newBoards array
		this.updateBoards();
	}

	renameBoard(uid, newName) {
		// to be used for renaming the board, currently not functional
    var boardNamesTemp = this.state.newBoards;
    var renameTileSuccess = 0;
    boardNamesTemp.forEach((board, index) => {
      if (board.uid === uid) {
        board.name = newName;
        renameTileSuccess = 1;
      }
    });

    if (!renameTileSuccess) {
      console.log("Something went wrong, rename failed. ", uid);
    }
    this.updateBoards();

	}

	render() {
		// { this.state.boardObjects } returns a list of all <BoardTile> elements
		// that are stored in boardObjects and renders them
		return(
			<div>
				{this.componentDidMount}
				<NavBoard user={this.state.user}/>
				<div class="container">
					<h3 class="mt-5 mb-4"><i class="fa fa-user-o mr-2" aria-hidden="true"></i> {this.state.user.displayName}'s Boards</h3>
					<div class="row" id="personal-boards">
						{ this.state.boardObjects }
						<NewBoardTile onSubmit={boardName => { this.onNewBoardSubmit(boardName) }}/>
					</div>
				</div>
			</div>
		)
	}
}

export { BoardTile, Dashboard };
