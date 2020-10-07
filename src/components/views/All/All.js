import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import {ItemSummary} from '../../features/ItemSummary/ItemSummary';
import { Footer } from '../../layout/Footer/Footer';

import { connect } from 'react-redux';
import {getAll, fetchAll} from '../../../redux/productsRedux';

import styles from './All.module.scss';
import {motion} from 'framer-motion';
import {pageTransition, pageVariants} from '../../../motion/pageTransition';

import {isNotEmpty} from '../../../utils/checkIfObjNotEmpty';


const Component = ({className, children, allProducts, fetchAllItems}) => {


  useEffect(() => {fetchAllItems();}, [fetchAllItems]); 

  const {kids, kits, accessories, books} = allProducts;

  return(
    <motion.div className={clsx(className, styles.root)} initial={pageVariants.initial} animate={pageVariants.in} exit={pageVariants.out} transition={pageTransition}>
      <div className={styles.items}>
        {isNotEmpty(kits.data) ? kits.data.map(kit => <ItemSummary key={kit._id} {...kit}/>) : null}
        {isNotEmpty(books.data) ? books.data.map(book => <ItemSummary key={book._id} {...book}/>) : null}
        {isNotEmpty(kids.data) ? kids.data.map(kid => <ItemSummary key={kid._id} {...kid}/>) : null}
        {isNotEmpty(accessories.data) ? accessories.data.map(accessory => <ItemSummary key={accessory._id} {...accessory}/>) : null}
      </div>
      <Footer/>
    </motion.div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fetchAllItems: PropTypes.func,
  allProducts: PropTypes.object,
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
  Container as All,
  Component as AllComponent,
};
