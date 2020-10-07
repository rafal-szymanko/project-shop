import React, {useState} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { addNewsletterRequest, getRequest } from '../../../redux/newsletterRedux.js';

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import styles from './NewsletterForm.module.scss';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


const Component = ({className, subscribeNewsletter, request}) => {

  const [formContent, setFormContent]= useState({mail: ''});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormContent({
      [name]: value,
    });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    subscribeNewsletter(formContent);
    setFormContent({mail: ''});
  };
  
  const renderMessage = () => {
    if (request === undefined) {
      return;
    } else if(request.pending === false && request.success === true) {
      return (
        <p className={styles.success}>You’re subscribed. We’ll keep you up to date with all things.</p>
      );
    } else if(request.pending === false && request.success === false) {
      return (
        <p className={styles.failure}>Something went wrong. Please try again.</p>
      );
    } else if (request.pending === false && request.success === false) {
      return (
        <CircularProgress />
      );
    }
  };

  return (
    <div className={clsx(className, styles.root)}>
      <ValidatorForm className={styles.form} noValidate autoComplete="off"  onSubmit={handleSubmit} onError={errors => console.log(errors)}>
        {renderMessage()}
        <TextValidator className={styles.input} id="standard-basic" label="Your email" name="mail" value={formContent.mail} onChange={handleChange} validators={['required', 'isEmail']} errorMessages={['this field is required', 'email is not valid']} />
        <Button className={styles.button} variant="contained" type="submit">Subscribe</Button>
      </ValidatorForm>
    </div>
  );
};


Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  request: PropTypes.object,
  subscribeNewsletter: PropTypes.func,
};

const mapStateToProps = state => ({
  request: getRequest(state, 'SUBSCRIBE_NEWSLETTER'),
});

const mapDispatchToProps = dispatch => ({
  subscribeNewsletter: (data) => dispatch(addNewsletterRequest(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);


export {
  // Component as NewsletterForm,
  Container as NewsletterForm,
  Component as NewsletterFormComponent,
};
