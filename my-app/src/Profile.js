import React, { Component } from 'react';
import { NavBoard } from './Nav.js';
import './Profile.css'


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "TestSam",
      userEmail: "Sam@sam.com",
      user: NULL, // This will contain a reference to the logged-in user
      boards: [],
      cards: []

      // State variables for editing
      areFieldFormsOpen: false

    }
    // userName is a string literal which must be recieved from the database
    // userEmail is a string literal which must be recieved from the database
    // boards is an array of Boards that the user is related to
    // cards is an array of the ASSIGNED cards that the user have
  }





  render() {
    return(
      <div>
        <NavBoard />
        <div class="container">
          <h3 class="mt-5 mb-4">
            {/* TODO make the user name display dynamic */}
            <i class="fa fa-id-card" id="sect" aria-hidden="true"> Profile Page</i>
          </h3>

      		<div class="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
          	 <div class="profile">
              <div class="row text-left">
                <div class="flex">
                  <div class="profile">
                    {/* Name of current profile */}
                    <h2>Patty Le</h2>

                    {/* fun stuff */}
                    <p><strong>About: </strong> Hi, my name is patrick! and I love food! more more more :) </p>
                    <p><strong>Hobbies: </strong> Coding, Sleeping, Eating, Coding </p>

                    {/* TODO Show emails*/}
                    <p><strong> Emails: </strong> Testing.js.com </p>
                    {/* TODO list of Boards*/}
                    <p>
                      <strong> Boards: </strong>
                      <li>
                        <a href="ToBoard1"> ToBoard1 </a>
                      </li>
                      <li>
                        <a href="ToBoard2"> ToBoard2 </a>
                      </li>
                    </p>
                    {/* TODO list of cards*/}
                    <p>
                      <strong> Cards: </strong>
                      <li>
                        <a href="ToCards1"> ToCards1 </a>
                      </li>
                      <li>
                        <a href="ToCards2"> ToCards2 </a>
                      </li>
                    </p>

                  </div>
                </div>
              </div>
          	 </div>
      		</div>
        </div>
      </div>
    )

  }





}


export { Profile };
