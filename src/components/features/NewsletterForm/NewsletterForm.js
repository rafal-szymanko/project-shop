import React, {useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import clsx from 'clsx';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import styles from './NewsletterForm.module.scss';
import { Button } from '@material-ui/core';

const Component = ({className}) => {

  const [formContent, setFormContent]= useState({mail: ''});
  const [response, setResponse]= useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormContent({
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('http://localhost:8000/api/newsletter', formContent)
      .then(function (response) {
        setResponse(response.status);
      })
      .catch(function (error) {
        console.log(error);
        setResponse(500);
      });

    setFormContent({mail: ''});
    
  };

  return (
    <div className={clsx(className, styles.root)}>
      <ValidatorForm className={styles.form} noValidate autoComplete="off"  onSubmit={handleSubmit} onError={errors => console.log(errors)}>
        {response === 200 ? <p className={styles.success}>You’re subscribed. We’ll keep you up to date with all things.</p> : null}
        {response === 500 ? <p className={styles.failure}>Something went wrong. Please try again.</p> : null}
        <TextValidator className={styles.input} id="standard-basic" label="Your email" name="mail" value={formContent.mail} onChange={handleChange} validators={['required', 'isEmail']} errorMessages={['this field is required', 'email is not valid']} />
        <Button className={styles.button} variant="contained" type="submit">Subscribe</Button>
      </ValidatorForm>
    </div>
  );
};


Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as NewsletterForm,
  // Container as NewsletterForm,
  Component as NewsletterFormComponent,
};
