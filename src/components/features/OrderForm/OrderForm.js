import React, {useState} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getCartItems } from '../../../redux/cartRedux.js';
import { addOrderRequest } from '../../../redux/ordersRedux.js';

import styles from './OrderForm.module.scss';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const Component = ({className, children, basket, sendOrder}) => {

  const {totalAmount, products} = basket;

  const prop = 'image';

  const newProduct = products.map(product => Object.keys(product).reduce((obj, key) => {
    if(key !== prop) {
      obj[key] = product[key];
    }
    return obj;
  }, {}));


  const [formContent, setFormContent]= useState({
    shippingDetails : {
      name: '',
      address: '',
      code: '',
      city: '',
      mail: '',
      phone: '',
    },
    products: newProduct,
    totalAmount: totalAmount,
  });

  const handleOnSubmit = (event) => {
    event.preventDefault();
    sendOrder(formContent);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormContent({
      ...formContent,
      shippingDetails : {
        ...formContent.shippingDetails,
        [name]: value,
      },
    });
  };

  return (
    <div className={clsx(className, styles.root)}>
      <form noValidate onSubmit={handleOnSubmit} className={styles.form}>
        <TextField id="standard-basic" label="Company or Name" name='name' onChange={handleOnChange} />
        <TextField id="standard-basic" label="Address" name='address' onChange={handleOnChange}/>
        <TextField id="standard-basic" label="Zip Code" name='code' onChange={handleOnChange}/>
        <TextField id="standard-basic" label="City" name='city' onChange={handleOnChange}/>
        <TextField id="standard-basic" label="E-mail" name='mail' onChange={handleOnChange}/>
        <TextField id="standard-basic" label="Phone" name='phone' onChange={handleOnChange}/>
        <Button className={styles.button} variant="contained" type="submit">confirm order</Button>
      </form>
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

const mapDispatchToProps = dispatch => ({
  sendOrder: (data) => dispatch(addOrderRequest(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as OrderForm,
  Component as OrderFormComponent,
};
