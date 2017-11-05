import React, { Component } from 'react';
import { NavBoard } from './Nav.js';
import { Link } from 'react-router-dom'
//import data from './boards.json';

class BoardTile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showTools: false
		}
		this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
		this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
		//this.delete = this.delete.bind(this);
	}

	onMouseEnterHandler() {
		this.setState({ showTools: true });
	}

	onMouseLeaveHandler() {
		this.setState({ showTools: false });
	}

	rename() {
		console.log("Renaming something...");

	}

	delete() {
		console.log("Deleting something...");
		//this.props.onDelete;
	}

	render() {
		var boardLink = "board/" + this.props.name; // create a string to link to particular board

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
		this.props.onRename();
	}

	share() {
		console.log("I want to share");
	}

	unlink() {
		console.log("I want to unlink");
	}

	delete() {
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
		this.props.onSubmit(boardName);
	};

	toggleForm() {
		this.setState({
			isOpen: !this.state.isOpen // When called, flips the state value (true->false)
		});
	}

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
	}

	state = { boardName: '' }

	componentDidMount() {
		this.newFormInput.focus();
	}

	checkValidity(nameToCheck) {
		return(!(/[^A-Za-z0-9_-\s]/.test(nameToCheck)));
	}

	onSubmit = (e) => {
		e.preventDefault(); // prevents default action of reloading the page on form submit
		//this.setState({ boardName: '' }); // clears the form input field
		if (this.checkValidity(this.state.boardName)) {
			console.log("This name is valid!");
			this.props.onSubmit(this.state.boardName.trim()); // calls prop onSubmit function, passing it the value in the input field
			this.props.onClose();	// when submitting the form, this calls the "onClose" prop method of "NewBoardTile.toggleform()"
		}
		else {
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
		}
	}

	componentDidMount() {
		document.title = "Huddle Dashboard";
		this.updateBoards();
	}

	onNewBoardSubmit = (boardName) => {
		console.log("Received BoardName:", boardName);
		this.setState({ newBoard: true });
		this.state.newBoardNames.push(boardName);
		this.updateBoards();
	}

	updateBoards() {
		var boards = this.state.newBoardNames.map(function(name, index) {
			return(<BoardTile name={name} key={index} onDelete={this.deleteBoard(name)}/>)
		}, this);

		var myBoards = [];

		boards.forEach(function(item, key) {
			myBoards.push(item);
		})

		this.setState({ boardObjects: myBoards }, function() {
			console.log(this.state.boardObjects);
		});
	}

	deleteBoard(name) {
		console.log("Delete board tile from dashboard object called: ", name);
	}

	render() {

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
