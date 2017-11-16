import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'bloom-forms';

import { addAlert } from 'redux-store/actions/alertActions'
import { createUser } from 'redux-store/actions/userActions'

import ExampleForm from 'presentation/forms/example-form';

class ExampleFormContainer extends React.Component {

  rerouteAfterSubmit = (res, formData) => {
    this.props.history.push('/lending');
  };

  submitForm = async (formData, files, successCallback, failCallback) => {
    try {
      const res = await this.props.createUser(formData)
      this.rerouteAfterSubmit()
    } catch(err) {
      this.props.addAlert(err)
      failCallback(err)
    }
  }

  render() {
    const fieldNames = ['textinput', 'password', 'checkbox', 'radio', 'date', 'currency', 'select', 'toggle', 'file-simple',
      'file-simple-2', 'file-droppable', 'onlyBloop'];

    const validationHelp = {
      dictionary: {
        'must-equal-bloop': (testData) =>
          testData !== 'bloop'
            ? 'Sorry, this field has to be "bloop."'
            : null
      }
    }

    return (
      <Form id='example-form' fieldNames={ fieldNames } submitForm={ this.submitForm } validationHelp={ validationHelp }>
        <ExampleForm />
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAlert: (message, style='warning') =>
      dispatch(addAlert(message, style)),
    createUser: (userData) =>
      dispatch(createUser(userData))
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user || {}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExampleFormContainer));
