import React, { Component } from 'react';
import { NavBoard } from './Nav.js';
import Column from './Column.js';

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
