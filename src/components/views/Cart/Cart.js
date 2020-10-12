import React, {useState} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import {Redirect} from 'react-router-dom';


import { connect } from 'react-redux';
import { getCartItems, removeItemRequest, updateCart } from '../../../redux/cartRedux.js';

import { Footer } from '../../layout/Footer/Footer';

import styles from './Cart.module.scss';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {motion} from 'framer-motion';
import {pageTransition, pageVariants} from '../../../motion/pageTransition';

const Component = ({className, basket, remove, update}) => {

  const {totalAmount, products} = basket;
  const [productId, setProductId] = useState('');
  const [comment, setComment] = useState('');
  const [fireRedirect, setFireRedirect] = useState(false);

  const handleOnChange = (event, id) => {
    const {value } = event.target;
    setProductId(id);
    setComment(value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if(comment) {
      update({id: productId, text: comment});
    }
    setFireRedirect(true);
  };

  const handleOnClick = (id, price, quantity) => {
    const count = totalAmount - price * Number(quantity);
    remove({id: id, amount: count});
  };

  return (
    <motion.div className={clsx(className, styles.root)} initial={pageVariants.initial} animate={pageVariants.in} exit={pageVariants.out} transition={pageTransition}>
      {products.length > 0 ? products.map(product => (
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
            <div className={styles.commentDelete}>
              <IconButton aria-label="delete" color="secondary" onClick={() => {
                handleOnClick(product.productId, product.price, product.quantity);
              }}>
                <DeleteIcon />
              </IconButton>
              <form  noValidate autoComplete="off" className={styles.form} id='form' onSubmit={handleOnSubmit}>
                <TextField id="standard-basic" label="Comments" name='comments' onChange={event => handleOnChange(event, product.productId)}/>
                {fireRedirect ?
                  <Redirect to={'/cart/order'}/>
                  : null
                }
              </form>
            </div>
          </CardContent>
        </Card>
      )
      )
        : <h2 className={styles.emptyBasket}>Your shopping basket is empty</h2>
      }
      {products.length > 0 ? 
        <div className={styles.wrapper}>
          <Button form='form' className={styles.button} variant="contained" type="submit">proceed</Button>
        </div>
        : null
      }
      <Footer/>
    </motion.div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  basket: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  remove: PropTypes.func,
  update: PropTypes.func,
};

const mapStateToProps = state => ({
  basket: getCartItems(state),
});

const mapDispatchToProps = dispatch => ({
  remove: (id) => dispatch(removeItemRequest(id)),
  update: (data) => dispatch(updateCart(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Cart,
  Component as CartComponent,
};
