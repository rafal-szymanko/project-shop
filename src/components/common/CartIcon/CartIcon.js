import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import { getCartItems } from '../../../redux/cartRedux.js';

import styles from './CartIcon.module.scss';

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Button from '@material-ui/core/Button'; 

const Component = ({className, children, cart}) => {

  return(
    <div className={clsx(className, styles.root)}>
      <Link to={'/cart'}>
        <Button
          className={styles.button}
          variant="contained" 
          startIcon={<ShoppingBasketIcon />}
        > Basket ({cart.products.length})   
        </Button>
      </Link>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cart: PropTypes.array,
};

const mapStateToProps = state => ({
  cart: getCartItems(state),
});


const Container = connect(mapStateToProps)(Component);


export {
  // Component as CartIcon,
  Container as CartIcon,
  Component as CartIconComponent,
};
