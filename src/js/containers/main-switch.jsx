import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ExampleFormContainer from 'containers/forms/example-form-container';
import HomeContainer from 'containers/home-container';
import LoginFormContainer from 'containers/forms/login-form-container';
import NewUserFormContainer from 'containers/forms/new-user-form-container';

import ExampleAccordion from 'presentation/example-accordion'

import FourOhFour from 'pages/four-oh-four.jsx';

const MainSwitch = (props) => (
  <main>
    <Switch>
      <Route exact path='/' render={ () => (
        props.user ?
          <HomeContainer />
        :
          <Redirect to='/login' />
        )} />
      <Route path='/login' component={ LoginFormContainer } />
      <Route path='/new' component={ NewUserFormContainer } />
      <Route exact path='/example' component={ ExampleFormContainer } />
      <Route path='/example/accordion' component={ ExampleAccordion } />
      <Route path='*' component={ FourOhFour } />
    </Switch>
  </main>
);

const mapStateToProps = (state) => {
  return {
    user: state.user || {},
  }
}

export default withRouter(connect(mapStateToProps)(MainSwitch));