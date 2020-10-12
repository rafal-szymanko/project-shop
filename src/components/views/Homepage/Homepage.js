import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import {ItemSummary} from '../../features/ItemSummary/ItemSummary';
import {Baner} from '../../features/Baner/Baner';
import { Footer } from '../../layout/Footer/Footer';

import { connect } from 'react-redux';
import {fetchAll, getAll} from '../../../redux/productsRedux';

import styles from './Homepage.module.scss';

import PhoneIcon from '@material-ui/icons/Phone';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import {motion} from 'framer-motion';
import {pageTransition, pageVariants} from '../../../motion/pageTransition';

import {isNotEmpty} from '../../../utils/checkIfObjNotEmpty';

const Component = ({className, fetchAllItems, allProducts}) => {

  useEffect(() => {fetchAllItems();}, [fetchAllItems]);

  const {kids, kits, accessories, books} = allProducts;
    
  return(
    <motion.div className={clsx(className, styles.root)} initial={pageVariants.initial} animate={pageVariants.in} exit={pageVariants.out} transition={pageTransition}>
      <Baner/>
      <div className={styles.container}>
        <div>
          <h2 className={styles.title}>Bestsellers</h2>
        </div>
        <div className={styles.items}>
          {isNotEmpty(kits.data) ? kits.data.filter(kits => kits.bestseller === true).map(items => <ItemSummary key={items._id} {...items}/>) : null}
          {isNotEmpty(books.data) ? books.data.filter(books => books.bestseller === true).map(items => <ItemSummary key={items._id} {...items}/>) : null}
          {isNotEmpty(kids.data) ? kids.data.filter(kids => kids.bestseller === true).map(items => <ItemSummary key={items._id} {...items}/>) : null}
          {isNotEmpty(kits.data) ? accessories.data.filter(accessories => accessories.bestseller === true).map(items => <ItemSummary key={items._id} {...items}/>) : null}
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
  allProducts: PropTypes.object,
  fetchBestsellersItems: PropTypes.func,
  fetchAllItems: PropTypes.func,

};

const mapStateToProps = state => ({
  allProducts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAllItems: () => dispatch(fetchAll()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);


export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
