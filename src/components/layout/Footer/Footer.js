import React, {useState} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import {Link} from 'react-router-dom';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Footer.module.scss';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const Component = ({className, children}) => {

  const [formContent, setFormContent]= useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormContent({
      ...formContent,
      [name]: value,
    });
  };
  

  return(
    <div className={clsx(className, styles.root)}>
      <div>
        <div className={styles.logo}>
          <h2>MU Store Ltd</h2>
        </div>
        <p>Greengate,</p>
        <p>Manchester,</p>
        <p>United Kingdom,</p>
        <p>M24 1FD,</p>
        <p>Phone: +44 (0) 333 014 4543</p>
      </div>
      <div className={styles.sitemap}>
        <div className={styles.sitemapContainer}>
          <h2>Sitemap</h2>
          <Link to='/all'>All Products</Link>
          <Link to='/kits'>Kits</Link>
          <Link to='/kids'>Kids</Link>
          <Link to='/books'>Books</Link>
          <Link to='/accessories'>Gifts & Accessories</Link>
        </div>
      </div>
      <div className={styles.newsletter}>
        <h2>Newsletter</h2>
        <p> Do you want to receive exclusive emails with discounts and product information?</p>
        <form className={styles.form}>
          <TextField className={styles.input}id="standard-basic" label="Your email" name="mail" onChange={handleChange}/>
          <Button className={styles.button}>Subscribe</Button>
        </form>
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Footer,
  // Container as Footer,
  Component as FooterComponent,
};
