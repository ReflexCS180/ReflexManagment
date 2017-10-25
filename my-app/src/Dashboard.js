import React, { Component } from 'react';
import ReactDOM from 'react-dom';


// or Board-Preview
class BoardTile extends Component {
	render() {
		return(
			<div class="col-12 col-sm-6 col-lg-3">
				<button class="btn btn-primary btn-block btn-lg mb-5 project-btn">{this.props.name}</button>
			</div>
		)
	}
}

class NewBoardTile extends Component {
	constructor(props) {
		super(props);
		this.state = {isOpen: false};
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit = (boardName) => {
		//console.log("My new board name will be: ", boardName);
		this.props.onSubmit(boardName);
	};

	toggleForm() {
		this.setState({
			isOpen: !this.state.isOpen
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

	state = {	boardName: '' }

	componentDidMount() {
		this.newFormInput.focus();
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.setState({ boardName: '' })
		this.props.onSubmit(this.state.boardName);
		this.props.onClose();	//when submitting the form, this calls the "onClose" prop method of "NewBoardTile.toggleform()"
	}

	render() {
		if(!this.props.show) {
			return null;
		}

		return(
			<div id="new-board-form" class="col-12">
				<button class="close-button" onClick={this.props.onClose.bind(this)}>&times;</button>
				<form>
					<h5 style={{borderBottom: "1px solid black", display: "inline-block"}}>Create A New Board</h5>
					<p>Use this simple form to create a new board. You can always change the name and other settings later.</p>
					<div class="form-group">
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
		// this.state = {formOpen: false};
		// this.state = {newBoard: false};
		// this.state = {newBoardName: ''};
		this.state = {
			formOpen: false,
			newBoard: false,
			newBoardNames: {}
		}
	}

	onNewBoardSubmit = (boardName) => {
		console.log("GOT IT: ", boardName);
		this.setState({ newBoardName: boardName, newBoard: true });
	}

	render() {
		return(
			<div class="container">
				<h3 class="mt-5 mb-4"><i class="fa fa-user-o mr-2" aria-hidden="true"></i> Personal Boards</h3>
				<div class="row" id="personal-boards">
					<BoardTile name="My First Board"/>
					{this.state.newBoard && <BoardTile name={this.state.newBoardName} />}
					<NewBoardTile onSubmit={boardName => { this.onNewBoardSubmit(boardName) }}/>
				</div>
			</div>
		)
	}
}

export { BoardTile, Dashboard };
