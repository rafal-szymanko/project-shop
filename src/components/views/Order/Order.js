import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import {OrderForm} from '../../features/OrderForm/OrderForm';

import { connect } from 'react-redux';
import { getCartItems } from '../../../redux/cartRedux.js';

import styles from './Order.module.scss';


const Component = ({className, basket}) => {

  const {totalAmount} = basket;

  const shippingValue = 0;

  return (
    <div className={clsx(className, styles.root)}>
      <OrderForm/>
      <div className={styles.summary}>
        <p>Purchase value: {totalAmount.toFixed(2)} €</p>
        <p>Shipping value: {shippingValue.toFixed(2)} €</p>
        <h2>Total: {(totalAmount + shippingValue).toFixed(2)} €</h2>
      </div>
    </div>
  );
};


Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  basket: PropTypes.object,
  sendOrder: PropTypes.func,
};

const mapStateToProps = state => ({
  basket: getCartItems(state),
});


const Container = connect(mapStateToProps)(Component);

export {
  Container as Order,
  Component as OrderComponent,
};
