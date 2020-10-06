import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import {getById, fetchItem} from '../../../redux/productRedux';
import {getTotalAmount, addItemRequest, getCartItems} from '../../../redux/cartRedux';

import styles from './ProductSummary.module.scss';
import CardMedia from '@material-ui/core/CardMedia';

import {isNotEmpty} from '../../../utils/checkIfObjNotEmpty';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';





const Component = ({className, product, fetchById, add, getAmount, basket}) => {

  const [fetchedItem, setFetchedItem] = useState({});
  const [cart, setCart] = useState({});
  const [amount, setAmount] = useState(getAmount);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {fetchById();}, [fetchById]);
  useEffect(() => {if(isNotEmpty(product)) {setFetchedItem(...product);}}, [product]);

  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setCart({
      ...cart,
      [name]: value,
      name: fetchedItem.name,
      price: fetchedItem.price,
      productId: fetchedItem._id,
      image: fetchedItem.image,
    });
    if(name === 'quantity') {
      setAmount(amount + (fetchedItem.price * Number(value)));
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const checkIfExistInCart = basket.products.filter(item=> item.productId === cart.productId);
    if(checkIfExistInCart.length > 0) {
      setShowMessage({show: true, status: 'failed'});
    } else {
      setShowMessage({show: true, status: 'success'});
      add({cart: cart, amount: amount});
    }
  };

  return (
    <div className={clsx(className, styles.root)}>
      {isNotEmpty(fetchedItem) ? 
        <div className={styles.details}>
          <CardMedia
            className={styles.media}
            component="img"
            alt={fetchedItem.image}
            image={`http://localhost:8000/images/${fetchedItem.image}`}
            title={fetchedItem.image}
          />
          <div className={styles.description}>
            <h2>{fetchedItem.name}</h2>
            <h2> Your price: {fetchedItem.price.toFixed(2)} €</h2>
            {showMessage.show && showMessage.status === 'failed' ? <p className={styles.messageFailure}>Item is already in your cart.</p> : null}
            {showMessage.show && showMessage.status === 'success' ? <p className={styles.messageSuccess}>Your product has been added to your cart.</p> : null}
            <form className={styles.form} onSubmit={handleOnSubmit}>
              {fetchedItem.size.length > 0 ?
                <div className={styles.formWrapper}>
                  <InputLabel htmlFor="age-native-simple">Size</InputLabel>
                  <Select
                    native
                    required
                    onChange={handleOnChange}
                    inputProps={{
                      name: 'size',
                    }}
                  >
                    <option aria-label="None" value="" />
                    {fetchedItem.size.map(item=> <option key={item} value={item}>{item}</option>)}
                  </Select>
                </div>
                : null
              }
              <InputLabel htmlFor="age-native-simple">Quantity</InputLabel>
              <Select
                native
                required
                onChange={handleOnChange}
                inputProps={{
                  name: 'quantity',
                }}
              >
                <option aria-label="None" value="" />
                {quantity.map(item=> <option key={item} value={item}>{item}</option>)}
              </Select>
              <Button className={styles.button} variant="contained" type="submit">add to cart</Button>
            </form>
            {fetchedItem.details.length > 0 ?
              <ul className={styles.detailsList}>
                <h3 className={styles.detailsHeader}>Details</h3>
                {fetchedItem.details.map(detail => <li className={styles.detailsItem} key={detail}>{detail}</li>)}
              </ul>
              :null
            }
            <div className={styles.detailsList}>
              <h3 className={styles.detailsHeader}>Description</h3>
              {fetchedItem.description}
            </div>
          </div>
        </div>
        : <CircularProgress color="secondary" />
      }
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  product: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  fetchById: PropTypes.func,
  add: PropTypes.func,
  totalAmount: PropTypes.func,
  getAmount: PropTypes.number,
  basket: PropTypes.array,
};

const mapStateToProps = state => ({
  basket: getCartItems(state),
  product: getById(state),
  getAmount: getTotalAmount(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchById: () => dispatch(fetchItem(props.match.params.id)),
  add: (data) => dispatch(addItemRequest(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as ProductSummary,
  Component as ProductSummaryComponent,
};
