import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import {OrderForm} from '../../features/OrderForm/OrderForm';
import { Footer } from '../../layout/Footer/Footer';

import { connect } from 'react-redux';
import { getCartItems } from '../../../redux/cartRedux.js';
import { getRequest} from '../../../redux/ordersRedux.js';

import styles from './Order.module.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import {motion} from 'framer-motion';
import {pageTransition, pageVariants} from '../../../motion/pageTransition';

const Component = ({className, basket, request}) => {

  const {totalAmount, products} = basket;
  const shippingValue = 0;

  const renderMessage = () => {
    if(products.length === 0 && request === undefined) {
      return (
        <h2 className={clsx(styles.failed, styles.summary)}>Your shopping basket is empty.</h2>
      );
    }
    else if(products.length > 0 && request === undefined) {
      return(
        <div className={styles.summary}>
          <p>Purchase value: {totalAmount.toFixed(2)} €</p>
          <p>Shipping value: {shippingValue.toFixed(2)} €</p>
          <h2>Total: {(totalAmount + shippingValue).toFixed(2)} €</h2>
        </div>
      );
    } else if(products.length === 0 && request.success === true && request.pending === false) {
      return(
        <h2 className={clsx(styles.success, styles.summary)}>We have just received your order</h2>
      );
    } else if(products.length === 0 && request.success === false && request.pending === false) {
      return(
        <h2 className={clsx(styles.failed, styles.summary)}>Something went wrong please try again.</h2>
      );
    } else {
      return(
        <div className={styles.summary}>
          <CircularProgress />
        </div>
      );
    }
  };


  return (
    <motion.div className={clsx(className, styles.root)} initial={pageVariants.initial} animate={pageVariants.in} exit={pageVariants.out} transition={pageTransition}>
      <div className={styles.wrapper}>
        <OrderForm /> 
        {renderMessage()}
      </div>
      <Footer/>
    </motion.div>
  );
};


Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  basket: PropTypes.array,
  sendOrder: PropTypes.func,
  request: PropTypes.object,
};

const mapStateToProps = state => ({
  basket: getCartItems(state),
  request: getRequest(state, 'ADD_ORDER'),
});


const Container = connect(mapStateToProps)(Component);

export {
  Container as Order,
  Component as OrderComponent,
};
