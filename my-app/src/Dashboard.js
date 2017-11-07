import React, { Component } from 'react';
import { NavBoard } from './Nav.js';
import { Link } from 'react-router-dom';
import './Dashboard.css';

class BoardTile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showTools: false
		}

		// binds certain functions so the "this" keyword knows what to refer to
		this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
		this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
		this.delete = this.delete.bind(this);
		this.rename = this.rename.bind(this);
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
		this.props.onRename(this.props.name);
	}

	delete() {
		// when called, passes the name of the button to the dashboard component
		// to be deleted
		this.props.onDelete(this.props.name);
	}

	render() {
		// create a string to link to particular board
		// ex: board/myfirstboard if the name of the board is "myfirstboard"
		var boardLink = "board/" + this.props.name;

		// if state.showTools is true, then render BoardTileTools component
		// if not, only render the main button
		return(
			<div class="col-12 col-sm-6 col-lg-3 board-tile" onMouseLeave={this.onMouseLeaveHandler}>
				<Link to={boardLink} className="btn btn-primary btn-lg btn-block project-btn board-btn"
					onMouseEnter={this.onMouseEnterHandler}>
					{this.props.name}
				</Link>
				{this.state.showTools && <BoardTileTools onRename={this.rename} onDelete={this.delete}/>}
			</div>
		)
	}
}

class BoardTileTools extends Component {
	constructor(props){
		super(props);
		this.rename = this.rename.bind(this);
		this.delete = this.delete.bind(this);
	}

	rename() {
		// calls onRename function of the parent BoardTile when rename button is clicked
		this.props.onRename();
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
				<BoardTileToolButton onClick={this.rename} title={"Rename Board"} classes={"fa fa-pencil"}/>
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
			newBoardNames: ["My First Board"],
			boardObjects: []
		};
		// newBoardNames is an array of just the names of the boards (for convenience)
		// boardObjects is an array of objects that contain the names and React DOM info of each boardObjects
		// note: the board tiles are actually rendered from boardObjects, not from newBoardNames
		// newBoardNames is used for easy updates. boardObjects is then updated based on the names in newBoardNames
	}

	componentDidMount() {
		// on component load: changes tab name and updates state.boardObjects
		document.title = "Huddle Dashboard";
		this.updateBoards();
	}

	onNewBoardSubmit = (boardName) => {
		// when newBoardForm is submitted: updates state, adds new board name,
		// then updates state.boardObjects
		this.setState({ newBoard: true });
		this.state.newBoardNames.push(boardName);
		this.updateBoards();
	}

	updateBoards() {
		// look at this.state.newBoardNames, map the names to variable "boards"
		// basically creates an array? of objects with one <BoardTile> for each name in newBoardNames
		var boards = this.state.newBoardNames.map(function(name, index) {
			return(<BoardTile name={name} key={index} onDelete={this.deleteBoard.bind(this, name)} onRename={this.renameBoard.bind(this, name)}/>)
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

	deleteBoard(name) {
		// creates new variable boardNamesTemp to do all the delete work in
		var boardNamesTemp = this.state.newBoardNames;

		// finds the first instance of "name" parameter in the array
		var deleteTileIndex = boardNamesTemp.indexOf(name);

		// removes the corresponding element from the array
		boardNamesTemp.splice(deleteTileIndex, 1);

		// sets state.newBoardNames to be equal to new array with deleted item
		this.setState({ newBoardNames: boardNamesTemp }, function() {
			// prints the name of the deleted board AFTER state is set
			console.log("Deleted Board: ", name);
		});

		// updates state.boardObjects based on the newBoardNames array
		this.updateBoards();
	}

	renameBoard(name) {
		// to be used for renaming the board, currently not functional
		console.log("Rename board tile from dashboard component called: ", name);
	}

	render() {
		// { this.state.boardObjects } returns a list of all <BoardTile> elements
		// that are stored in boardObjects and renders them
		return(
			<div>
				<NavBoard />
				<div class="container">
					<h3 class="mt-5 mb-4"><i class="fa fa-user-o mr-2" aria-hidden="true"></i> Personal Boards</h3>
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
