import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import {NavLink, Link} from 'react-router-dom';

import {Logo} from '../../common/Logo/Logo';
import {Cart} from '../../features/Cart/Cart';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

const Component = ({className, children}) => {



  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.upperNavigation}>
        <NavLink to='/'>
          <div className={styles.logoContainer}>
            <Logo/>
            <h2>Manchester United Store</h2>
          </div>
        </NavLink>
        <div className={styles.buttonsContainer}>
          <Cart/>
        </div>
      </div>
      <div className={styles.bottomNavigation}>
        <Link to='/kits'>KITS</Link>
        <Link to='/kids'>KIDS</Link>
        <Link to='/books'>BOOKS</Link>
        <Link to='/gifts'>GIFTS & ACCESSORIES</Link>
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
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
