import React, { Component } from 'react';
import { NavBoard } from './Nav.js'; // Why do we need this import in Board.js?
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
			boardName: "Board Name" /* TODO: Add feature to match board name with selected board*/
		}
	}

	componentDidMount() {
    // changes title of browser tab
    document.title = "Huddle Board Page";
    
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

					{/*TODO Resize column width for small screens*/}
					<div class="row">
						<Column columnName="Backlog"/>
						<Column columnName="In Progress"/>
						<Column columnName="Completed"/>
					</div>
				</div>
			</div>
		)
	}
}

export { Board }; //
