import React, { } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Dashboard } from './Dashboard.js'
import { NavLanding } from './Nav.js'
import { Board } from './Board.js'
import { Login } from './Login.js'
import { Register } from './Register.js'
import './App.css';
import './Landing.css';

const Landing = () => (
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
          <a class="btn btn-xl js-scroll-trigger" href="login">Register Here!</a>
        </div>
      </div>
    </header>

    <section id="services">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-heading">Services</h2>
            <h3 class="section-subheading text-muted">A Software Management built by Software Engineers for Software Engineers</h3>
          </div>
        </div>
        <div class="row text-center">
          <div class="col-md-4">
            <span class="fa-stack fa-4x">
              <i class="fa fa-circle fa-stack-2x text-primary"></i>
              <i class="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
            </span>
            <h4 class="service-heading">Ship Products Faster!</h4>
            <p class="text-muted">Huddle is noted as one of the best software management application. Companies from all over the world has paised our services for being clean and practical.</p>
          </div>
          <div class="col-md-4">
            <span class="fa-stack fa-4x">
              <i class="fa fa-circle fa-stack-2x text-primary"></i>
              <i class="fa fa-laptop fa-stack-1x fa-inverse"></i>
            </span>
            <h4 class="service-heading">Responsive Design</h4>
            <p class="text-muted">Our team are all software engineers so we created minimalistic design to allows our user to quickly define, communicate, and resolve their issue. </p>
          </div>
          <div class="col-md-4">
            <span class="fa-stack fa-4x">
              <i class="fa fa-circle fa-stack-2x text-primary"></i>
              <i class="fa fa-lock fa-stack-1x fa-inverse"></i>
            </span>
            <h4 class="service-heading">Web Security</h4>
            <p class="text-muted">We have a dedicated security who are there 24/7 for support. Our security features are always updated to keep up with ever changing technogogly.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
)


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={ Landing } />
      <Route exact path='/dashboard' component={ Dashboard } />
      <Route exact path='/board' component={ Board } />
      <Route exact path='/login' component={ Login } />
      <Route exact path='/register' component={ Register } />
    </Switch>
  </main>
)

const App = () => (
  <div>
    <Main />
  </div>
)

export { App };
