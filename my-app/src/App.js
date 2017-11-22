import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Dashboard } from './Dashboard.js'
import { NavLanding } from './Nav.js'
import { Board } from './Board.js'
import { Login } from './Login.js'
import { Register } from './Register.js'
import { Profile } from './Profile.js'
import { About } from './About.js'
import './App.css';
import './Landing.css';

class App extends Component {
  render(){
    return(
      <div>
        <Main />
      </div>
    )
  }
}

class Landing extends Component {
  componentDidMount() {
    // changes title of browser tab
    document.title = "Huddle by Reflex";
  }


  render() {
    return(
      <div>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <NavLanding />

        <header class="masthead">
          <div class="container">
            <div class="intro-text">
              <div class="intro-lead-in">Management Tool for Software Engineers</div>
              <div class="intro-heading">Huddle</div>
              <a class="btn btn-xl js-scroll-trigger mr-2" href="login">Login</a>
              <a class="btn btn-xl js-scroll-trigger" href="register">Register</a>
            </div>
          </div>
        </header>
        <section id="services">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 text-center">
                <h2 class="section-heading">Services</h2>
                <h3 class="section-subheading text-muted">Project management tool built by software engineers for software engineers.</h3>
              </div>
            </div>
            <div class="row text-center">
              <div class="col-md-4">
                <span class="fa-stack fa-4x">
                  <i class="fa fa-circle fa-stack-2x text-primary"></i>
                  <i class="fa fa-bolt fa-stack-1x fa-inverse"></i>
                </span>
                <h4 class="service-heading">Ship Products Faster</h4>
                <p class="text-muted">Huddle is a project management application for developers. Break your projects down into small tasks and watch your progress. Share and collaborate to develop even faster!</p>
              </div>
              <div class="col-md-4">
                <span class="fa-stack fa-4x">
                  <i class="fa fa-circle fa-stack-2x text-primary"></i>
                  <i class="fa fa-laptop fa-stack-1x fa-inverse"></i>
                </span>
                <h4 class="service-heading">Practical Design</h4>
                <p class="text-muted">Our no frills design lends itself to higher productivity. Instead of messing around with a glitchy UI, focus on developing and keeping your project moving.</p>
              </div>
              <div class="col-md-4">
                <span class="fa-stack fa-4x">
                  <i class="fa fa-circle fa-stack-2x text-primary"></i>
                  <i class="fa fa-users fa-stack-1x fa-inverse"></i>
                </span>
                <h4 class="service-heading">Collaborate</h4>
                <p class="text-muted">Share your boards with any registered users in seconds. All team members can contribute to the project by adding cards. Comments allow for contained project discussion.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={ Landing } />
      <Route exact path='/dashboard' component={ Dashboard } />
      <Route exact path='/board' component={ Board } />
      <Route path='/board/:boardID' component={ Board } />
      <Route exact path='/login' component={ Login } />
      <Route exact path='/register' component={ Register } />
      <Route path='/profile' component={ Profile } />
      <Route exact path='/about' component={ About } />
    </Switch>
  </main>
)

export { App };
