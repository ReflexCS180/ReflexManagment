import React, { Component } from 'react'; // abstract component base
import Modal from 'react-modal';
import { NavBoard } from './Nav.js'; // Why do we need this import in Board.js?
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './CardModalContent.css';

class CardModalContent extends Component {
  constructor(props) {
    super(props);

    this.state={
      isRenameCardFormOpen: false,  // 'renameCardFormOpen' refers to the rename button in card modal.
      cardName: this.props.cardName,
      renameInput: this.props.cardName
    }

    this.openRenameCardForm=this.openRenameCardForm.bind(this); // Telling the keyword this which component to refer to.

    console.log(this.props.cardName);
    console.log(this.props.columnName);
  }

  // Function to change state of renameCardFormOpen
  openRenameCardForm(){
    this.setState({
      isRenameCardFormOpen: true,
    });

  };

  // Pass new name of card to parent from this cardmodal.
  onSubmitCardRename(event) {
    event.preventDefault();

    // Change the local state of isRenameCardFormOpen back to false
    this.setState({
      isRenameCardFormOpen: false,
    });
    this.props.renameCardFromModalContent(this.state.renameInput)
  };

  render() {
    return(
      <div id="CardModalContent-content">
        {/* Close Modal Top Right */}

        {/* Card Heading */}
        <div class="row">
          <div class="col">
            <div id="CardModalContent-heading">
              {/* Name of Card -- Should Be Placed Top Left*/}
              {this.state.isRenameCardFormOpen ?
                <div id="rename-card-form">
                  <form>
                    <input type="text" class="form-control" value={this.state.renameInput}
                      onChange={ event => this.setState({renameInput: event.target.value})} placeholder='Rename Card'/>

                    {/* The button below puts an arrow image in the input box*/}
                    <button onClick={e => this.onSubmitCardRename(e)} id="submit-rename-btn">
                      <i class="fa fa-arrow-right" aria-hidden="true"></i>
                    </button>
                  </form>
                </div>
                  :
                  <h1> <i class="fa fa-id-card-o" aria-hidden="true"></i> {this.props.cardName}</h1>
              }

                {/*Location of Card Relative to Column*/}
                <p>in list {this.props.columnName} </p>
            </div>
          </div>
          {/* <div class="col">
            <i class="fa fa-times" aria-hidden="true"></i>
          </div>
          */}
        </div>

        <div class="row">

          <div class="col-9">
            <div id="CardModalContent-leftbody">

            {/*
              //Members List
              <div id="CardModalContent-memberlist">
                <h3>Members</h3>
              </div>
            */}
              {/* Description */}
              <div id="CardModalContent-description">
                <h3>Description</h3>
                  <p>A long description of what this card represents. </p>
              </div>

              {/* Comment */}
              <div id="CardModalContent-comment">
                <h3><i class="fa fa-comment-o" aria-hidden="true"></i>Add Comment</h3>
                <input></input>
                  {/* Save Button for Comment*/}
                  <button>Save</button>
              </div>
              {/* Activity */}
            </div>
          </div>

          <div class="col">
            <div id="CardModalContent-rightbody">
              {/* 'Add' Buttons */}
              <div id="CardModalContent-addbuttons">

                <div class="row">
                  <h4>Add</h4>
                </div>

                <div class="row">
                  {/* 'Members' Button */}
                  <Button>Members</Button>
                </div>

                <div class="row">
                  {/* 'Labels' Button */}
                  <Button>Labels</Button>
                </div>

                <div class="row">
                  {/* 'Checklist' Button */}
                  <Button>Checklist</Button>
                </div>

                <div class="row">
                  {/* 'Due Date' Button */}
                  <Button>Due Date</Button>
                </div>

                  {/* 'Attachement' Button -- Implementation in version 2  */}
              </div>

              {/* 'Actions' Buttons*/}
              <div id="CardModalContent-actionbuttons">
                <div class="row">
                  <h4>Actions</h4>
                </div>

                <div class="row">
                  {/* 'Rename' Button */}
                  <Button onClick={this.openRenameCardForm}>Rename</Button>
                </div>

                <div class="row">
                  {/* 'Move' Button */}
                  <Button>Move</Button>
                </div>

                <div class="row">
                  {/* 'Copy' Button */}
                  <Button>Copy</Button>
                </div>

                {/* 'Subscribe' Button -- Implementation in version 2 */}

                <div class="row">
                  {/* 'Delete' Button */}
                  <Button>Delete</Button>
                </div>
                {/* 'Archive' Button -- Implementation in version 2*/}
              </div>
            </div>
          </div> {/* End of second col-8 */}
        </div>   {/* End of second row */}
    </div>       // End of main div
    )
  }
}

export default CardModalContent;
