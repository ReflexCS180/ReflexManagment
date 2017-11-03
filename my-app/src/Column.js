import React, { Component } from 'react'; // abstract component base
import Card from './Card.js'

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnName: this.props.name
    }
  }

  render() {
		return(
      <div class="col-2" >
        <div class="col-12 board-column">
          <div class="card-header">{this.state.columnName}</div>
          <div class="btn-group-vertical">
            <Card name="First Card"/>
            <Card name="Second Card"/>
          </div>
        </div>
      </div>


		)
  }
}

// DERPIRCATED CODE MOVING TO CLASS STRUCTURE
// const Column = () => (
// 	<div>
// 		<h2>Column</h2>
// 	</div>
// )



export default Column; //
