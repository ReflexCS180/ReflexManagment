import React, { Component } from 'react'; // abstract component base
import Card from './Card.js'

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnName: this.props.name,
      cardNames: ["First Card"]
    }
  }

  onSubmit(cardName) {
    console.log("New card: ", cardName);
    this.state.cardNames.push(cardName);
  }

  render() {
    var cards = this.state.cardNames.map(function(name, index) {
			return(<Card name={name} key={index}/>)
		})

		return(
      <div class="col-2" >
        <div class="col-12 board-column">
          <div class="card-header">{this.state.columnName}</div>
          <div class="btn-group-vertical">
            { cards }
            <NewCardForm onSubmit={ cardName => { this.onSubmit(cardName) }} />
          </div>
        </div>
      </div>
		)
  }
}

class NewCardForm extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	state = { cardName: '' }

	onSubmit = (e) => {
		e.preventDefault(); // prevents default action of reloading the page on form submit
		this.setState({ cardName: '' }) // clears the form input field
		this.props.onSubmit(this.state.cardName); // calls prop onSubmit function, passing it the value in the input field
	}

	render() {

		return(
			<div id="new-card-form" class="mb-4">
				<form class="form-inline">
					<input type="text" class="form-control" value={this.state.cardName}
						onChange={e => this.setState({ cardName: e.target.value}) }
						ref={input => { this.newFormInput = input }} id="new-card-name" placeholder="Add new card" />
					<button onClick={e => this.onSubmit(e)} class="btn btn-primary">&#10145;</button>
				</form>
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
