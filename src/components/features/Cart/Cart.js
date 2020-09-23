import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Cart.module.scss';

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';


const Component = ({className, children}) => {


  const renderCart = () => {
    console.log('klik');
    return(
      <div className={styles.cart}>
      cart content
      </div>
    );
  };

  return(
    <div className={clsx(className, styles.root)}>
      <ShoppingBasketIcon className={styles.cartIcon} onClick={renderCart}/>
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
  Component as Cart,
  // Container as Cart,
  Component as CartComponent,
};
