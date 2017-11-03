import React, { Component } from 'react';
import { NavBoard } from './Nav.js';
import { Link } from 'react-router-dom'
//import data from './boards.json';

class BoardTile extends Component {
	render() {
		var boardLink = "board/" + this.props.name;
		console.log("This boards name is: ", this.props.name);
		return(
			<div class="col-12 col-sm-6 col-lg-3">
				<Link to={boardLink} className="btn btn-primary btn-lg btn-block mb-5 project-btn board-btn">{this.props.name}</Link>
			</div>
		)
	}
}

// This is the button to create a new board; only used once
class NewBoardTile extends Component {
	constructor(props) {
		super(props);
		this.state = {isOpen: false};
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
		return(!(/[^A-Za-z0-9_-]/.test(nameToCheck)));
	}

	onSubmit = (e) => {
		e.preventDefault(); // prevents default action of reloading the page on form submit
		//this.setState({ boardName: '' }); // clears the form input field
		if (this.checkValidity(this.state.boardName)) {
			console.log("This name is valid!");
			this.props.onSubmit(this.state.boardName); // calls prop onSubmit function, passing it the value in the input field
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
			newBoardNames: ["My First Board"]
			// newBoardNames: data
		}
	}

	componentDidMount() {
		document.title = "Huddle Dashboard";
	}

	onNewBoardSubmit = (boardName) => {
		console.log("Received BoardName:", boardName);
		this.setState({ newBoard: true });
		this.state.newBoardNames.push(boardName);
	}

	render() {
		var boards = this.state.newBoardNames.map(function(name, index) {
			return(<BoardTile name={name} key={index}/>)
		})

		// var boards = this.state.newBoardNames.boards.map(function(name, index) {
		// 	return(<BoardTile name={name} key={index}/>)
		// })

		//console.log(data);

		return(
			<div>
				<NavBoard />
				<div class="container">
					<h3 class="mt-5 mb-4"><i class="fa fa-user-o mr-2" aria-hidden="true"></i> Personal Boards</h3>
					<div class="row" id="personal-boards">
						{ /* <BoardTile name="My First Board"/> */ }
						{ boards }
						<NewBoardTile onSubmit={boardName => { this.onNewBoardSubmit(boardName) }}/>
					</div>
				</div>
			</div>
		)
	}
}

export { BoardTile, Dashboard };
