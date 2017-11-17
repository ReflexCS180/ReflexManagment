import React, { Component } from 'react';
import { NavBoard } from './Nav.js';
import './Profile.css'
import firebase, { auth } from './firebase.js';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      userEmail: null,
      userID: null,
      user: null, // This will contain a reference to the logged-in user
      boards: [],
      cards: [],

      // State variables for editing
      areFieldFormsOpen: false

    }
    // userName is a string literal which must be recieved from the database
    // userEmail is a string literal which must be recieved from the database
    // boards is an array of Boards that the user is related to
    // cards is an array of the ASSIGNED cards that the user is related to

    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) { //note that we cannot simply assign "user: userAuth" because object cannot be passed
            //console.log("user is logged in");
            this.setState({
              user: firebase.auth().currentUser
            }, function() {
              this.setState({
                userName: this.state.user.displayName,
                userEmail: this.state.user.email
              })
            })
          }
      else {
        console.log("user is not logged in");
      }
    });
  }


  componentDidMount(){
    // Right now we only log in via Google login, so the information we pull
    // from Firebase should be limited to what we can draw from Google, which
    // is NAME and EMAIL.

    // http://javascript.tutorialhorizon.com/2014/09/13/execution-sequence-of-a-react-components-lifecycle-methods/
    // FIXME: For now, implement the firebase call inside of the costructor only, since we
    // are not giving the user the option to eidt anything, so subsequent calls
    // to the Db for updating are unnecessary.
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
                    <h2>{this.state.userName}</h2>

                    {/* fun stuff */}
                    {/* <p><strong>About: </strong> Hi, my name is patrick! and I love food! more more more :) </p>
                    <p><strong>Hobbies: </strong> Coding, Sleeping, Eating, Coding </p> */}

                    {/* <p><strong> Emails: </strong> Testing.js.com </p>
                    {/* TODO list of Boards*/}
                    <p>
                      <strong> {this.state.userEmail} </strong>
                    </p>
                    {/* TODO list of cards*/}
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
