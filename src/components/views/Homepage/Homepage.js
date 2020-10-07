import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import {ItemSummary} from '../../features/ItemSummary/ItemSummary';
import {Baner} from '../../features/Baner/Baner';
import { Footer } from '../../layout/Footer/Footer';

import { connect } from 'react-redux';
import {fetchBestsellers, getAllBestsellers} from '../../../redux/bestsellersRedux';
import {fetchAll} from '../../../redux/productsRedux';

import styles from './Homepage.module.scss';

import PhoneIcon from '@material-ui/icons/Phone';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import {motion} from 'framer-motion';
import {pageTransition, pageVariants} from '../../../motion/pageTransition';

import {isNotEmpty} from '../../../utils/checkIfObjNotEmpty';

const Component = ({className, bestsellers, fetchBestsellersItems, fetchAllItems}) => {

  useEffect(() => {fetchBestsellersItems();}, [fetchBestsellersItems]);
  useEffect(() => {fetchAllItems();}, [fetchAllItems]);

  const {kids, kits, accessories, books} = bestsellers;
    
  return(
    <motion.div className={clsx(className, styles.root)} initial={pageVariants.initial} animate={pageVariants.in} exit={pageVariants.out} transition={pageTransition}>
      <Baner/>
      <div className={styles.container}>
        <div>
          <h2 className={styles.title}>Bestsellers</h2>
        </div>
        <div className={styles.items}>
          {isNotEmpty(kits.data) ? kits.data.map(kit => <ItemSummary key={kit._id} {...kit}/>) : null}
          {isNotEmpty(books.data) ? books.data.map(book => <ItemSummary key={book._id} {...book}/>) : null}
          {isNotEmpty(kids.data) ? kids.data.map(kid => <ItemSummary key={kid._id} {...kid}/>) : null}
          {isNotEmpty(accessories.data) ? accessories.data.map(accessory => <ItemSummary key={accessory._id} {...accessory}/>) : null}
        </div>
      </div>
      <div className={styles.container}>
        <div>
          <h2 className={styles.title}>Discover Manchester United Store</h2>
        </div>
        <div className={clsx(styles.items, styles.options)}>
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
      <Footer/>
    </motion.div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  bestsellers: PropTypes.object,
  fetchBestsellersItems: PropTypes.func,
  fetchAllItems: PropTypes.func,

};

const mapStateToProps = state => ({
  bestsellers: getAllBestsellers(state),
});

const mapDispatchToProps = dispatch => ({
  fetchBestsellersItems: () => dispatch(fetchBestsellers()),
  fetchAllItems: () => dispatch(fetchAll()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);


export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
