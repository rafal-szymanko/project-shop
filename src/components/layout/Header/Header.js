import React from 'react';

import PropTypes from 'prop-types';

import clsx from 'clsx';
import {NavLink, Link} from 'react-router-dom';

import {Logo} from '../../common/Logo/Logo';
import {CartIcon} from '../../common/CartIcon/CartIcon';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';
import MenuIcon from '@material-ui/icons/Menu';

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
          <CartIcon/>
        </div>
        <MenuIcon className={styles.menuIcon}></MenuIcon>
      </div>
      
      <div className={styles.bottomNavigation}>
        <Link to='/all'>ALL PRODUCTS</Link>
        <Link to='/kits'>KITS</Link>
        <Link to='/kids'>KIDS</Link>
        <Link to='/books'>BOOKS</Link>
        <Link to='/accessories'>GIFTS & ACCESSORIES</Link>
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
