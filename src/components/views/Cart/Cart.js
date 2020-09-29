import React, {useState} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getCartItems, removeFromCart, countTotalAmount } from '../../../redux/cartRedux.js';

import styles from './Cart.module.scss';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const Component = ({className, children, cart, remove, countAmount}) => {

  const {totalAmount, products} = cart;
  const [amount, setAmount] = useState(totalAmount);


  const handleClick = (id, price, quantity) => {

    const count = totalAmount - price * Number(quantity);
    setAmount(count);
    remove(id);
    countAmount(count);
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
              handleClick(product.productId, product.price, product.quantity);
            }}>
              <DeleteIcon />
            </IconButton>
          </CardContent>

        </Card>
      )
        : <h2>Your shopping basket is empty</h2>
      }
      <div>
        {products.length > 0 ? <h2 className={styles.amount}>Total Amount {amount.toFixed(2)} €</h2> : null}
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cart: PropTypes.array,
  remove: PropTypes.func,
  countAmount: PropTypes.func,
};

const mapStateToProps = state => ({
  cart: getCartItems(state),
});

const mapDispatchToProps = dispatch => ({
  remove: id => dispatch(removeFromCart(id)),
  countAmount: (amount) => dispatch(countTotalAmount(amount)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
// const Container = connect(mapStateToProps)(Component);

export {
  // Component as Cart,
  Container as Cart,
  Component as CartComponent,
};
