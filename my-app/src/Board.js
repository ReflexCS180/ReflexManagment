import React, { Component } from 'react';
import { NavBoard } from './Nav.js';
import Column from './Column.js';

class Board extends Component {
	render() {
		return(
			<div>
				<NavBoard />
				<div class="container">
					<h3 class="mt-5 mb-4">Board Name</h3>
					<Column />
				</div>
			</div>
		)
	}
}

export { Board }; //
