import React, {useState} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import { getCartItems, removeFromCart, updateCart } from '../../../redux/cartRedux.js';

import styles from './Cart.module.scss';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';


const Component = ({className, basket, remove, update}) => {

  const {totalAmount, products} = basket;
  const [amount, setAmount] = useState(totalAmount);
  const [productId, setProductId] = useState('');
  const [comment, setComment] = useState('');

  const handleOnChange = (event, id) => {
    const {value } = event.target;
    setProductId(id);
    setComment(value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    update({id: productId, text: comment});
  };

  const handleOnClick = (id, price, quantity) => {
    const count = totalAmount - price * Number(quantity);
    setAmount(count);
    remove({id: id, amount: count});
  };

  return (
    <div className={clsx(className, styles.root)}>
      {products.length > 0 ? products.map(product => 
        <Card className={styles.card} key={product._id}>
          <CardMedia
            className={styles.media}
            image={`http://localhost:8000/images/${product.image}`}
          />
          <CardContent className={styles.content}>
            <Typography
              className={styles.header}
              variant={'h6'}
              gutterBottom
            >
              {product.name}
            </Typography>
            <Typography
              className={styles.header}
              variant={'h6'}
            >
              Quantity: {product.quantity}
            </Typography>
            {product.size ? 
              <Typography
                className={styles.header}
                variant={'h6'}
              >
              Size: {product.size}
              </Typography>
              : <div className={styles.header}></div>
            }
            <Typography
              className={styles.header}
              variant={'h6'}
            >
              {product.price.toFixed(2)} €
            </Typography>
            <IconButton aria-label="delete" color="secondary" onClick={() => {
              handleOnClick(product.productId, product.price, product.quantity);
            }}>
              <DeleteIcon />
            </IconButton>
            <form  noValidate autoComplete="off" className={styles.form} id='form' onSubmit={handleOnSubmit}>
              <TextField id="standard-basic" label="Comments" name='comments' onChange={event => handleOnChange(event, product.productId)}/>
            </form>
          </CardContent>
        </Card>
      )
        : <h2 className={styles.emptyBasket}>Your shopping basket is empty</h2>
      }
      {products.length > 0 ? 
        <div className={styles.wrapper}>
          <Link to='/cart/order'>
            <Button form='form' className={styles.button} variant="contained" type="submit">proceed</Button>
          </Link>
        </div>
        : null
      }
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  basket: PropTypes.array,
  remove: PropTypes.func,
  update: PropTypes.func,
};

const mapStateToProps = state => ({
  basket: getCartItems(state),
});

const mapDispatchToProps = dispatch => ({
  remove: (id) => dispatch(removeFromCart(id)),
  update: (data) => dispatch(updateCart(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Cart,
  Component as CartComponent,
};
