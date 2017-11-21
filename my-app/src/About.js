import React, { Component } from 'react';
import { NavBoard } from './Nav.js';
import { Link } from 'react-router-dom';
import './About.css'
import ReactImg from './img/about/ReactJS.png'
import JSImg from './img/about/JavaScript.png'
import firebaseImg from './img/about/Firebase.png'
import nginxImg from './img/about/NGINX.png'
import digitImg from './img/about/DigitalOcean.png'
import bootImg from './img/about/Bootstrap.png'


class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areFieldFormsOpen: false
    }
  }

  componentWillMount(){
    document.title = "About Huddle";
  }


  render() {
    return(
      <div>
        <NavBoard />
        <div class="container">
          <div id="about-jumbotron" class="jumbotron mt-4">
            <h1 class="display-3">About Huddle</h1>
            <p class="lead">
              Huddle is a project management based web application inspired by Agile methodologies such as Scrum and Kanban.
              Create and share boards, then add cards for each user story. Watch your project progress visually.
            </p>
            <hr class="my-4" />
            <p>Built by Team Reflex.
              <Link to="/team"> Learn about us.</Link>
            </p>
          </div>
          <h3 class="mt-4 mb-4" id="sect" style={{display: 'inline-block'}}>
            {/* TODO make the user name display dynamic */}
            <i class="fa fa-power-off" aria-hidden="true"></i>
            &nbsp;Huddle is powered by:
          </h3>
  		    <div class="row">
            <div class="col-6 col-md-2 col-sm-4 col-xs-4 about-tile">
              <img src={JSImg} alt={"JSImage"}/>
            </div>

            <div class="col-6 col-md-2 col-sm-4 col-xs-4 about-tile">
              <img src={ReactImg} alt={"ReactJS"} />
            </div>

            <div class="col-6 col-md-2 col-sm-4 col-xs-4 about-tile">
              <img src={firebaseImg} alt={"Firebase"} />
            </div>

            <div class="col-6 col-md-2 col-sm-4 col-xs-4 about-tile">
              <img src={bootImg} alt={"Bootstrap"} />
            </div>

            <div class="col-6 col-md-2 col-sm-4 col-xs-4 about-tile">
              <img src={digitImg} alt={"Droplet"} />
            </div>

            <div class="col-6 col-md-2 col-sm-4 col-xs-4 about-tile">
              <img src={nginxImg} alt={"NGINX"} />
            </div>
          </div>
        </div>
      </div>
    )

  }





}

export { About }
