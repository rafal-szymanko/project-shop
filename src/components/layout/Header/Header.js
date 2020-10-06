import React, {useState} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import {NavLink, Link} from 'react-router-dom';

import {Logo} from '../../common/Logo/Logo';
import {CartIcon} from '../../common/CartIcon/CartIcon';

import { connect } from 'react-redux';
import { getCartItems} from '../../../redux/cartRedux.js';

import styles from './Header.module.scss';
import MenuIcon from '@material-ui/icons/Menu';
import { motion,AnimatePresence } from 'framer-motion';

const variants = {
  hidden: { left: '360px', right: '-360px', transition: {ease: 'linear'}},
  visible: {left: 0, right: 0, transition: {ease: 'linear'}},
};

const Component = ({className, basket}) => {

  const [isOpen, setIsOpen] = useState(false);
  
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

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
        <div className={styles.menuIconWrapper}>
          <MenuIcon className={styles.menuIcon} onClick={handleClick}></MenuIcon>
          <AnimatePresence>
            {isOpen ? (
              <motion.div className={styles.menuList} variants={variants} initial='hidden' animate='visible' exit='hidden'>
                <Link to='/all' onClick={handleClick}>ALL PRODUCTS</Link>
                <Link to='/kits' onClick={handleClick}>KITS</Link>
                <Link to='/kids' onClick={handleClick}>KIDS</Link>
                <Link to='/books' onClick={handleClick}>BOOKS</Link>
                <Link to='/accessories' onClick={handleClick}>GIFTS & ACCESSORIES</Link>
                <Link to='/cart'onClick={handleClick}>SHOPPING BASKET {`(${basket.products.length})`}</Link>
              </motion.div>
            )
              : null }
          </AnimatePresence>
        </div>
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
  basket: PropTypes.array,
};

const mapStateToProps = state => ({
  basket: getCartItems(state),
});

const Container = connect(mapStateToProps)(Component);

export {
  Container as Header,
  Component as HeaderComponent,
};
