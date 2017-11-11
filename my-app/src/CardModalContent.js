import React, { Component } from 'react'; // abstract component base
import Modal from 'react-modal';
import { NavBoard } from './Nav.js'; // Why do we need this import in Board.js?

class CardModalContent extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.cardName);
    console.log(this.props.columnName);
  }

  render() {
    return(
      <div id="CardModalContent-content">
        {/* Close Modal Top Right */}

        {/* Card Heading */}
        <div class="row">
          <div class="col">
            <div id="CardModalContent-heading">
              {/* Name of Card -- Should Be Placed Top Left*/}
              <h1> <i class="fa fa-id-card-o" aria-hidden="true"></i> {this.props.cardName}</h1>
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
                  <button>Members</button>
                </div>

                <div class="row">
                  {/* 'Labels' Button */}
                  <button>Labels</button>
                </div>

                <div class="row">
                  {/* 'Checklist' Button */}
                  <button>Checklist</button>
                </div>

                <div class="row">
                  {/* 'Due Date' Button */}
                  <button>Due Date</button>
                </div>

                  {/* 'Attachement' Button -- Implementation in version 2  */}
              </div>

              {/* 'Actions' Buttons*/}
              <div id="CardModalContent-actionbuttons">
                <div class="row">
                  <h4>Actions</h4>
                </div>

                <div class="row">
                  {/* 'Move' Button */}
                  <button>Move</button>
                </div>

                <div class="row">
                  {/* 'Copy' Button */}
                  <button>Copy</button>
                </div>

                {/* 'Subscribe' Button -- Implementation in version 2 */}

                <div class="row">
                  {/* 'Delete' Button */}
                  <button>Delete</button>
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
