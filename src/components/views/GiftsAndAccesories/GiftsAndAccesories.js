import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import {ItemSummary} from '../../features/ItemSummary/ItemSummary';
import { Footer } from '../../layout/Footer/Footer';

import { connect } from 'react-redux';
import {fetchAccessories, getAllAccessories} from '../../../redux/productsRedux';

import styles from './GiftsAndAccesories.module.scss';
import {motion} from 'framer-motion';
import {pageTransition, pageVariants} from '../../../motion/pageTransition';

import {isNotEmpty} from '../../../utils/checkIfObjNotEmpty';


const Component = ({className, children, accessories, fetchAllAccessories}) => {

  useEffect(() => {fetchAllAccessories();}, [fetchAllAccessories]); 

  return(
    <motion.div className={clsx(className, styles.root)} initial={pageVariants.initial} animate={pageVariants.in} exit={pageVariants.out} transition={pageTransition}>
      <div className={styles.items}>
        {isNotEmpty(accessories.data) ? accessories.data.map(kit => <ItemSummary key={kit._id} {...kit}/>) : null}
      </div>
      <Footer/>
    </motion.div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fetchAllAccessories: PropTypes.func,
  accessories: PropTypes.object,
};

const mapStateToProps = state => ({
  accessories: getAllAccessories(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAllAccessories: () => dispatch(fetchAccessories()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as GiftsAndAccesories,
  Container as GiftsAndAccesories,
  Component as GiftsAndAccesoriesComponent,
};
