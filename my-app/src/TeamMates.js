import React, { Component } from 'react'; // abstract component base
import Card from './Card.js'

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personName: this.props.name,
      personAvatar: this.prop.avatar
    }
  }

  render() {
    var cards = this.state.cardNames.map(function(name, index) {
      return(<Card name={name} key={index}/>)
    })

		return(
      <div class="col-2" >
        <Testing>
      </div>
		)
  }

}




class TeamMates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personName: this.props.name,
      cardNames: [],
      nameError: false
    }
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
            { this.state.nameError && <span style={{color: "red", fontSize: "0.8rem", marginBottom: "12px"}}>Please use alphanumeric characters, dashes, and underscores.</span> }
          </div>
        </div>
      </div>
		)
  }
}


export default Team; //
