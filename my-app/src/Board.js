import React, { Component } from 'react';
import { NavBoard } from './Nav.js';
import Column from './Column.js';
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
			boardName: "Board Name"
		}
	}

	componentDidMount() {
		document.body.style.backgroundColor = "#ffe070";
		if (this.props.match.params.name !== undefined) {
			this.setState({boardName: this.props.match.params.name});
		}
	}

	componentWillUnmount() {
		document.body.style.backgroundColor = "#fff";
	}

	render() {
		return(
			<div>
				<NavBoard />
				<BoardMenu />

				<div class="container" id="board">
					<h3 class="mt-5 mb-4">{this.state.boardName}</h3>
					<div class="row">
						<Column name="Backlog"/>
						<Column name="In Progress"/>
						<Column name="Completed"/>
					</div>
				</div>
			</div>
		)
	}
}

export { Board }; //
