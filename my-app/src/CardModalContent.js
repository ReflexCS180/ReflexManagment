import React, { Component } from 'react';     // abstract component base
import { Button, DropdownButton, MenuItem } from "react-bootstrap";     // imported for button use
import './CardModalContent.css';              // imported for card modal content use

class CardModalContent extends Component {
  constructor(props) {
    super(props);

    this.state={
      isRenameCardFormOpen: false,                      // 'renameCardFormOpen' refers to the rename button in card modal.
      isDescriptionFormOpen: false,                     // 'isDescriptionFormOpen' form that opens to let user edit card description.
      isDueDateFormOpen: false,                         // 'isDueDateFormOpen' when true opens form to set card due date.
      isMoveCardFormOpen: false,
      cardName: this.props.cardName,                    // 'cardName' is set from parents card name
      renameInput: this.props.cardName,                 // 'renameInput' is set from parent by default. 'renameInput's can be changed in card modal by user.
      descriptionInput: this.props.cardDescription,     // 'descriptionInput' sets the card modal's description from parent
      cardComments: this.props.cardComments,            // 'cardComments'
      commentInput: '',                                 // 'commentInput'
      user: this.props.user,
      cardDueDate: this.props.cardDueDate,
      cardDueDateInput: '',                                 // 'cardDueDate' set to due date of the card by user.
    }

    this.openRenameCardForm = this.openRenameCardForm.bind(this);    // .bind(this) sets which component to refer to.
    this.openDescriptionForm = this.openDescriptionForm.bind(this);
    this.openDueDateForm = this.openDueDateForm.bind(this);
    this.moveCard = this.moveCard.bind(this);

    console.log(this.props.cardName);
    console.log(this.props.columnName);
  }

  /**
    * Rename Card Functions
    */

  // 'openRenameCardForm' changes the state of renameCardFormOpen
  // callback function "function()" of setState focuses on the input box
  openRenameCardForm(){
    this.setState({
      isRenameCardFormOpen: true,
    }, function() {
      this.renameCardFormInput.focus();
    });
  };

  // used by 'openRenameCardForm()' function above; highlights text of card rename input box
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

  ////////////// End of Rename Card functions

  /**
    * Description Functions
    */

  // Function to change state of isDescriptionFormOpen
  // callback function "function()" of setState focuses on the input box
  openDescriptionForm() {
    this.setState({
      isDescriptionFormOpen: true
    }, function() {
      this.descriptionFormInput.focus();
    });
  }

  //function checks if key entered is "Shift + Enter", in which case it submits form
  onKeyPressDescriptionForm(event) {
    var key = event.which || event.keyCode
    if (key === 13 && event.shiftKey) {
      this.onSubmitCardDescription(event);
    }
  }

  // handles submission of "Save" button for changing the card description
  onSubmitCardDescription(event) {
    event.preventDefault();

    this.setState({
      isDescriptionFormOpen: false
    });

    // pass the new description input to the parent Card
    this.props.changeCardDescription(this.state.descriptionInput);
  }

  //function checks if key entered is "Shift + Enter", in which case it submits form
  onKeyPressCommentForm(event) {
    var key = event.which || event.keyCode
    if (key === 13 && event.shiftKey) {
      this.onSubmitCardComment(event);
    }
  }

  // handles submission of "Add Comment" form
  onSubmitCardComment(event) {
    event.preventDefault();
    this.setState({
      commentInput: ''
    })
    this.commentFormInput.value = '';
    this.props.addCardComment(this.state.commentInput);
  }

  /////////////// End of Comment Functions

  /**
    * Due Date Functions
    */

    openDueDateForm(event){
      event.preventDefault();
      this.setState({
        isDueDateFormOpen: true,
      }, function() {
        this.dueDateFormInput.focus();
      });
    };

    // Pass new name of card to parent from this cardmodal.
    onSubmitDueDate(event) {
      event.preventDefault();

      // Change the local state of isRenameCardFormOpen back to false
      this.setState({
        isDueDateFormOpen: false,
        cardDueDate: this.state.cardDueDateInput    // Note: cardDueDateInput is the changed input value.
      });
     // This line of code allows us to pass info to parent.
        this.props.changeCardDueDate(this.state.cardDueDateInput)
    };

  /////////////// End of Comment Functions


  // closes modal when Close button or X is pressed
  closeModal() {
    this.props.closeModal()
  }
  /**
    * Delete Card Function
    */
  deleteCard(event) {
    event.preventDefault();
    // 'window.confirm' displays a prompt to the user at the top of the browser.
    //  Returns user input in the form of true or false.
    if (window.confirm("Are you sure you want to delete this card?")) {
      // user clicks okay
      this.props.closeModal();        // Close Modal before executing delete
      this.props.deleteCard();        // execute 'deleteCard' from parent component aka 'Card.js' component.
    }
  }

  // open move card form
  moveCard(event, columnToMoveTo) {
    alert("Move this card to: " + columnToMoveTo);
  }

  render() {
    // create multiple CardComment objects from the array of comments in state
    var comments = this.state.cardComments.map(function({username, comment, date}, index) {
			return(<CardComment username={username} comment={comment} date={date} key={index} />)
		})

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
              {/* Card Description */}
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
                        onKeyPress={ event => this.onKeyPressDescriptionForm(event) }
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
              <div id="CardModalContent-comment" class="mb-4">
                <h4><i class="fa fa-comment-o" aria-hidden="true"></i> Add Comment</h4>
                <textarea class="form-control mb-2" placeholder="Add your comment text here"
                  onChange={ event => this.setState({commentInput: event.target.value})}
                  onKeyPress={ event => this.onKeyPressCommentForm(event) }
                  ref={input => { this.commentFormInput = input }}
                />
                {/* Save Button for Comment*/}
                <button onClick={e => this.onSubmitCardComment(e)} id="save-comment-btn" class="btn btn-secondary mb-2">Save</button>
              </div>
              {/* Activity */}
              <div id="CardModalContent-activity">
                <h4><i class="fa fa-comments-o" aria-hidden="true"></i> Activity</h4>
                <ul id="card-activity-list">
                  { comments }
                </ul>
              </div>
            </div>
          </div>

          <div class="col-2">
            <div id="CardModalContent-rightbody">

              {/*Due Date*/}
              <div class="mb-4" >
                <div class="row">
                  {(this.state.cardDueDate === '') ?
                    <div>
                      {/*Empty Div Intentional. Does not display due.*/}
                    </div>
                      :
                      <div>
                        <h5 id="CardModalContent-dueDate">Due:</h5>
                        <p>{this.state.cardDueDate}</p>
                      </div>
                  } {/* end of ternary */}
                </div>
              </div>
              {/* 'Actions' Buttons*/}
              <div class='mb-4' id="CardModalContent-actionbuttons">
                <div class="row">
                  <h4>Actions</h4>
                </div>

                <div class="row">
                  {/* 'Rename' Button */}
                  <Button className="btn btn-secondary mb-1" block onClick={this.openRenameCardForm}>Rename</Button>
                </div>

                <div class="row">
                  {/* 'Move' Button */}
                  <DropdownButton title="Move" id="move-card-dropdown" className="btn btn-secondary mb-1">
                    <MenuItem eventKey="1" onSelect={e => this.moveCard(e, "Backlog")}>Backlog</MenuItem>
                    <MenuItem eventKey="2" onSelect={e => this.moveCard(e, "In Progress")}>In Progress</MenuItem>
                    <MenuItem eventKey="3" onSelect={e => this.moveCard(e, "Completed")}>Completed</MenuItem>
                  </DropdownButton>

                  <Button className="btn btn-secondary mb-1" block onClick={this.openMoveCardForm}>Move</Button>


                </div>

                {/* 'Copy' Button
                <div class="row">

                  <Button className="btn btn-secondary mb-1" block>Copy</Button>
                </div>
                */}

                {/* 'Subscribe' Button -- Implementation in version 2 */}

                <div class="row">
                  {/* 'Delete' Button */}
                  <Button onClick={e => this.deleteCard(e)} className="btn btn-secondary mb-1" block>Delete</Button>
                </div>
                {/* 'Archive' Button -- Implementation in version 2*/}
              </div>

              {/* 'Add' Buttons */}
              <div id="CardModalContent-addbuttons">

                <div class="row">
                  <h4>Add</h4>
                </div>

                <div class="row">
                  {/* 'Members' Button */}
                  <Button className="btn btn-secondary mb-1" block>Members</Button>
                </div>

                <div class="row">
                  {/* 'Due Date' Button */}

                  {(this.state.isDueDateFormOpen) ?
                    <form>
                      <input type="text" class="form-control" id="CardModalContent-DueDateForm" value={this.state.cardDueDateInput} className="mb-2"
                        onChange={ event => this.setState({cardDueDateInput: event.target.value})} placeholder='Card Due Date'
                        ref={input => { this.dueDateFormInput = input }} />
                      {/* The button below puts an arrow image in the input box*/}
                      <button onClick={e => this.onSubmitDueDate(e)} className="btn btn-secondary" id="submit-description-btn">
                        Save
                      </button>
                    </form>
                      :
                      <Button onClick={ e=> this.openDueDateForm(e)} className="btn btn-secondary mb-1" block>Due Date</Button>
                  }
                </div>
                  {/* 'Attachement' Button -- Implementation in version 2  */}
              </div>
            </div>
          </div> {/* End of second col-8 */}
        </div>   {/* End of second row */}
    </div>       // End of main div
    )
  }
}

class CardComment extends Component {
  render() {
    return(
      <li>
        {/*  */}
        <p class="card-comment-username">{this.props.username} commented: </p>
        <p class="card-comment-date">{this.props.date}</p>
        <p class="card-comment-comment">{this.props.comment}</p>
      </li>
    )
  }
}

export default CardModalContent;
