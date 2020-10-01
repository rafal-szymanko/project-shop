import React, {useState} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import { connect } from 'react-redux';
import { getCartItems, clearCart } from '../../../redux/cartRedux.js';
import { addOrderRequest } from '../../../redux/ordersRedux.js';

import styles from './OrderForm.module.scss';
import { Button } from '@material-ui/core';

const Component = ({className, children, basket, sendOrder, clearBasket}) => {

  const {totalAmount, products} = basket;

  console.log(basket);

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
    clearBasket();
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
      <ValidatorForm noValidate onSubmit={handleOnSubmit} className={styles.form} onError={errors => console.log(errors)}>
        <TextValidator id="standard-basic" label="Company or Name" name='name' value={formContent.shippingDetails.name} onChange={handleOnChange} validators={['required']} errorMessages={['this field is required']}/>
        <TextValidator id="standard-basic" label="Address" name='address' value={formContent.shippingDetails.address} onChange={handleOnChange} validators={['required']} errorMessages={['this field is required']}/>
        <TextValidator id="standard-basic" label="Zip Code" name='code' value={formContent.shippingDetails.code} onChange={handleOnChange} validators={['required']} errorMessages={['this field is required']}/>
        <TextValidator id="standard-basic" label="City" name='city' value={formContent.shippingDetails.city} onChange={handleOnChange} validators={['required', 'matchRegexp:[A-Za-z]']} errorMessages={['this field is required', 'city is not valid']}/>
        <TextValidator id="standard-basic" label="E-mail" name='mail' value={formContent.shippingDetails.mail} onChange={handleOnChange} validators={['required', 'isEmail']} errorMessages={['this field is required', 'email is not valid']}/>
        <TextValidator id="standard-basic" label="Phone" name='phone' value={formContent.shippingDetails.phone} onChange={handleOnChange} validators={['required', 'matchRegexp:^[0-9]']} errorMessages={['this field is required', 'phone number is not valid']}/>
        <Button className={styles.button} variant="contained" type="submit">confirm order</Button>
      </ValidatorForm>
    </div>
  );
};


Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  basket: PropTypes.object,
  sendOrder: PropTypes.func,
  clearBasket: PropTypes.func,
};

const mapStateToProps = state => ({
  basket: getCartItems(state),
});

const mapDispatchToProps = dispatch => ({
  sendOrder: (data) => dispatch(addOrderRequest(data)),
  clearBasket: () => dispatch(clearCart()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as OrderForm,
  Component as OrderFormComponent,
};
