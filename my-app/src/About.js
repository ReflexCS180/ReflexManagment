import React, { Component } from 'react';
import { NavBoard } from './Nav.js';
import './About.css'
import ReactImg from './img/about/ReactJS.png'
import JSImg from './img/about/JavaScript.png'
import firebaseImg from './img/about/Firebase.png'
import nginxImg from './img/about/NGINX.png'
import digitImg from './img/about/DigitalOcean.png'
import firebase, { auth } from './firebase.js';


class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areFieldFormsOpen: false
    }
  }
  
  componentDidMount(){

  }


  render() {
    return(
      <div>
        <NavBoard />
        <div class="container">
          <h3 class="mt-5 mb-4">
            {/* TODO make the user name display dynamic */}
            <i class="fa fa-power-off" id="sect" aria-hidden="true"> Huddle is powered by: </i>
          </h3>

      		<div class="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
          	 <div class="about">
              <div class="row text-left">
                <div class="flex">
                  <div class="about">
                  <div><img src={JSImg} alt={"JSImage"} height ="377" width="250"/><span align="center" style={{color: '#EDDB4F', fontWeight:'bold',fontSize:'25pt'}}> JavaScript </span></div>
                  <div><img src={ReactImg} alt={"ReactJS"} height ="377" width="250"/><span align="center" style={{color: '#47CAF0', fontWeight:'bold',fontSize:'31pt'}}> React </span></div>
                  <div><img src={firebaseImg} alt={"Firebase"} height ="377" width="250"/><span align="center" style={{color: '#F57F17', fontWeight:'bold',fontSize:'31pt'}}> Firebase </span></div>
                  <div><img src={digitImg} alt={"droplet"} height ="377" width="250"/><span align="center" style={{color: '#007CFF', fontWeight:'bold',fontSize:'31pt'}}> Droplet </span></div>
                  <div><img src={nginxImg} alt={"NGINX"} height ="377" width="250"/><span align="center" style={{color: '#009639', fontWeight:'bold',fontSize:'31pt'}}> NGINX </span></div>

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

export { About }
