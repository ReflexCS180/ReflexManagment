import React, { Component } from 'react'; // abstract component base
import { Button } from "react-bootstrap";
import './CardModalContent.css';

class CardModalContent extends Component {
  constructor(props) {
    super(props);

    this.state={
      isRenameCardFormOpen: false,  // 'renameCardFormOpen' refers to the rename button in card modal.
      isDescriptionFormOpen: false,
      cardName: this.props.cardName,
      renameInput: this.props.cardName,
      descriptionInput: this.props.cardDescription
    }

    this.openRenameCardForm = this.openRenameCardForm.bind(this); // Telling the keyword this which component to refer to.
    this.openDescriptionForm = this.openDescriptionForm.bind(this);

    console.log(this.props.cardName);
    console.log(this.props.columnName);
  }

  // Function to change state of renameCardFormOpen
  // callback function "function()" of setState focuses on the input box
  openRenameCardForm(){
    this.setState({
      isRenameCardFormOpen: true,
    }, function() {
      this.renameCardFormInput.focus();
    });
  };

  // used by "openRenameCardForm()" function above; highlights text of card rename input box
  handleFocus(e) {
    e.target.select();
  }

  // Pass new name of card to parent from this cardmodal.
  onSubmitCardRename(event) {
    event.preventDefault();

    // Change the local state of isRenameCardFormOpen back to false
    this.setState({
      isRenameCardFormOpen: false,
    });
    this.props.renameCardFromModalContent(this.state.renameInput)
  };

  // Function to change state of isDescriptionFormOpen
  // callback function "function()" of setState focuses on the input box
  openDescriptionForm() {
    this.setState({
      isDescriptionFormOpen: true
    }, function() {
      this.descriptionFormInput.focus();
    });
  }

  onSubmitCardDescription(event) {
    event.preventDefault();

    this.setState({
      isDescriptionFormOpen: false
    });

    this.props.changeCardDescription(this.state.descriptionInput);
  }

  closeModal() {
    this.props.closeModal()
  }


  render() {
    return(
      <div id="CardModalContent-content">
        {/* Close Modal Top Right */}


        {/* Card Heading */}
        <div class="row">
          <div class="col">
            <div id="CardModalContent-heading" class="mb-4">
            <button onClick={this.closeModal.bind(this)} class="cardModalContent-close-button" >&times;</button>
              {/* Name of Card -- Should Be Placed Top Left*/}
              {this.state.isRenameCardFormOpen ?
                <div id="rename-card-form">
                  <form>
                    <input type="text" class="form-control" value={this.state.renameInput}
                      onChange={ event => this.setState({renameInput: event.target.value})} placeholder='Rename Card'
                      ref={input => { this.renameCardFormInput = input }}
                      onFocus={this.handleFocus} />

                    {/* The button below puts an arrow image in the input box*/}
                    <button onClick={e => this.onSubmitCardRename(e)} id="submit-rename-btn">
                      <i class="fa fa-arrow-right" aria-hidden="true"></i>
                    </button>
                  </form>
                </div>
                  :
                  <h3> <i class="fa fa-id-card-o" aria-hidden="true"></i> {this.props.cardName}</h3>
              }

                {/*Location of Card Relative to Column*/}
                <p>in list: <span id="cardsColumnName">{this.props.columnName}</span></p>
            </div>
          </div>
          {/* <div class="col">
            <i class="fa fa-times" aria-hidden="true"></i>
          </div>
          */}
        </div>

        <div class="row">
          <div class="col-10">
            <div id="CardModalContent-leftbody">
              {/* Description */}
              <div id="CardModalContent-description" class="mb-4">
                <h4>
                  <i class="fa fa-list" aria-hidden="true"></i> Description
                </h4>
                <Button onClick={this.openDescriptionForm} id="edit-description-btn" className="ml-2 mb-2 btn btn-secondary" title="Change description">
                  <i className="fa fa-pencil" aria-hidden="true"></i> Edit
                </Button>
                {this.state.isDescriptionFormOpen ?
                  <div id="card-description-form">
                    <form>
                      <textarea class="form-control" value={this.state.descriptionInput} className="mb-2"
                        onChange={ event => this.setState({descriptionInput: event.target.value})} placeholder='Card Description'
                        ref={input => { this.descriptionFormInput = input }} />

                      {/* The button below puts an arrow image in the input box*/}
                      <button onClick={e => this.onSubmitCardDescription(e)} className="btn btn-secondary" id="submit-description-btn">
                        Save
                      </button>
                    </form>
                  </div>
                    :
                    <p id="card-description">{this.state.descriptionInput}</p>
                }

              </div>

              {/* Comment */}
              <div id="CardModalContent-comment">
                <h4><i class="fa fa-comment-o" aria-hidden="true"></i> Add Comment</h4>
                <textarea class="form-control mb-2" placeholder="Add your comment text here"></textarea>
                  {/* Save Button for Comment*/}
                  <button class="btn btn-secondary">Save</button>
              </div>
              {/* Activity */}
            </div>
          </div>

          <div class="col-2">
            <div id="CardModalContent-rightbody">
              {/* 'Add' Buttons */}
              <div id="CardModalContent-addbuttons">

                <div class="row">
                  <h4>Add</h4>
                </div>

                <div class="row">
                  {/* 'Members' Button */}
                  <Button className="btn btn-secondary mb-1" bsSize="default" block>Members</Button>
                </div>

                <div class="row">
                  {/* 'Labels' Button */}
                  <Button className="btn btn-secondary mb-1" bsSize="default" block>Labels</Button>
                </div>

                <div class="row">
                  {/* 'Checklist' Button */}
                  <Button className="btn btn-secondary mb-1" bsSize="default" block>Checklist</Button>
                </div>

                <div class="row">
                  {/* 'Due Date' Button */}
                  <Button className="btn btn-secondary mb-1" bsSize="default" block>Due Date</Button>
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
                  <Button className="btn btn-secondary mb-1" bsSize="default" block onClick={this.openRenameCardForm}>Rename</Button>
                </div>

                <div class="row">
                  {/* 'Move' Button */}
                  <Button className="btn btn-secondary mb-1" bsSize="default" block>Move</Button>
                </div>

                <div class="row">
                  {/* 'Copy' Button */}
                  <Button className="btn btn-secondary mb-1" bsSize="default" block>Copy</Button>
                </div>

                {/* 'Subscribe' Button -- Implementation in version 2 */}

                <div class="row">
                  {/* 'Delete' Button */}
                  <Button className="btn btn-secondary mb-1" bsSize="default" block>Delete</Button>
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
