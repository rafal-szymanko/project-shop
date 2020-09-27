import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { BestsellerSummary } from '../../features/BestsellerSummary/BestsellerSummary';
import {Baner} from '../../features/Baner/Baner';

import { connect } from 'react-redux';
import {getAllBestsellers, fetchBestsellers} from '../../../redux/productsRedux';

import styles from './Homepage.module.scss';

import PhoneIcon from '@material-ui/icons/Phone';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

import {isNotEmpty} from '../../../utils/checkIfObjNotEmpty';

const Component = ({className, children, bestsellers, fetchBestsellersItems}) => {

  useEffect(() => {fetchBestsellersItems();}, [fetchBestsellersItems]);

  const {kids, kits, accessories, books} = bestsellers;

  console.log(bestsellers);
  
  return(
    <div className={clsx(className, styles.root)}>
      {children}
      <Baner/>
      <div className={styles.container}>
        <div>
          <h2 className={styles.title}>Bestsellers</h2>
        </div>
        <div className={styles.items}>
          {isNotEmpty(kits.data) ? kits.data.map(kit => <BestsellerSummary key={kit._id} {...kit}/>) : null}
          {isNotEmpty(books.data) ? books.data.map(book => <BestsellerSummary key={book._id} {...book}/>) : null}
          {isNotEmpty(kids.data) ? kids.data.map(kid => <BestsellerSummary key={kid._id} {...kid}/>) : null}
          {isNotEmpty(accessories.data) ? accessories.data.map(accessory => <BestsellerSummary key={accessory._id} {...accessory}/>) : null}
        </div>
      </div>
      <div className={styles.container}>
        <div>
          <h2 className={styles.title}>Discover Manchester United Store</h2>
        </div>
        <div className={styles.items}>
          <div className={styles.item}>
            <LocalShippingIcon className={styles.icon}/>
            <p>Free Shipping</p>
          </div>
          <div className={styles.item}>
            <KeyboardReturnIcon className={styles.icon}/>
            <p>Free Return Shipping</p>
          </div>
          <div className={styles.item}>
            <PhoneIcon className={styles.icon}/>
            <p>24/7 Customer Service</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  bestsellers: PropTypes.object,
  fetchBestsellersItems: PropTypes.func,

};

const mapStateToProps = state => ({
  bestsellers: getAllBestsellers(state),
});

const mapDispatchToProps = dispatch => ({
  fetchBestsellersItems: () => dispatch(fetchBestsellers()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);


export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
