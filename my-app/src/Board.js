import React, { Component } from 'react';
import { NavBoard } from './Nav.js';
import Column from './Column.js';

class Board extends Component {
	render() {
		return(
			<div>
				<NavBoard />
				<div class="container" id="board">
					<h3 class="mt-5 mb-4">Board Name</h3>
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
