import React, { Component } from 'react';
import { NavBoard } from './Nav.js';
import { Link } from 'react-router-dom';
import './Team.css'
import ReactImg from './img/about/ReactJS.png'
import firebaseImg from './img/about/Firebase.png'
import nginxImg from './img/about/NGINX.png'
import digitImg from './img/about/DigitalOcean.png'
import bootImg from './img/about/Bootstrap.png'
import one from './img/team/1.jpg'
import Adrian from './img/team/Adrian.jpg'
import Rick from './img/team/Rick.jpg'
import Patrick from './img/team/Patrick2.jpg'
import Jeremy from './img/team/Jeremy.jpg'
import Gabriel from './img/team/Gabriel.jpg'
import firebase, { auth } from './firebase.js';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areFieldFormsOpen: false
    }
  }

  componentWillMount(){
    document.title = "Team Reflex";
  }


  render() {
    return(
      <div>
        <NavBoard />
        <div class="container mt-4 col-lg-12">
          <div class="mt-3" align="center">
            <h1 class="display-4">Team Reflex</h1>
            <h3 class="mt-2 mb-4" id="sect" style={{display: 'inline-block'}} >
              {/* TODO make the user name display dynamic */}
              <i class="fa fa-users" aria-hidden="true"></i>
              &nbsp;Meet our team&nbsp;
              <i class="fa fa-users" aria-hidden="true"></i>
            </h3>
          </div>
  		    <div class="row">

            <div class="col-0 col-lg-1">
            </div>

            <div class="col-sm-6 col-md-4 col-lg-2 team-member">
              <img class={"rounded-circle"} src={Jeremy} alt={"Jeremy"} />
              <h4>Jeremy ONeill</h4>
            </div>

            <div class="col-sm-6 col-md-4 col-lg-2 team-member">
              <img class={"rounded-circle"} src={Adrian} alt={"Adrian"} />
              <h4>Adrian Harminto</h4>
            </div>

            <div class="col-sm-6 col-md-4 col-lg-2 team-member">
              <img class={"rounded-circle"} src={Rick} alt={"Rick"} />
              <h4>Rick Boshae</h4>
            </div>

            <div class="col-sm-6 col-md-4 col-lg-2 team-member">
              <img class={"rounded-circle"} src={Patrick} alt={"Patrick"} />
              <h4>Patrick Le</h4>
            </div>

            <div class="col-sm-6 col-md-4 col-lg-2 team-member">
              <img class={"rounded-circle"} src={Gabriel} alt={"Gabriel"} />
              <h4>Gabriel Cortez</h4>
            </div>

          </div>
          <hr class="col-10" />
          <div id="team-jumbotron" class="team-jumbotron" align="center">
            <p>Built by Team Reflex.
              <Link to="/about"> Learn about Huddle.</Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

}

export { Team }
