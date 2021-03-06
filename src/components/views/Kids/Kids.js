import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import {ItemSummary} from '../../features/ItemSummary/ItemSummary';
import { Footer } from '../../layout/Footer/Footer';

import { connect } from 'react-redux';
import {getAllItemsForKids, fetchForKids} from '../../../redux/productsRedux';

import styles from './Kids.module.scss';
import {motion} from 'framer-motion';
import {pageTransition, pageVariants} from '../../../motion/pageTransition';

import {isNotEmpty} from '../../../utils/checkIfObjNotEmpty';


const Component = ({className, children, forKids, fetchAllItemsForKids}) => {

  useEffect(() => {fetchAllItemsForKids();}, [fetchAllItemsForKids]); 

  return(
    <motion.div className={clsx(className, styles.root)} initial={pageVariants.initial} animate={pageVariants.in} exit={pageVariants.out} transition={pageTransition}>
      <div className={styles.items}>
        {isNotEmpty(forKids.data) ? forKids.data.map(kit => <ItemSummary key={kit._id} {...kit}/>) : null}
      </div>
      <Footer/>
    </motion.div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fetchAllItemsForKids: PropTypes.func,
  forKids: PropTypes.object,
};

const mapStateToProps = state => ({
  forKids: getAllItemsForKids(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAllItemsForKids: () => dispatch(fetchForKids()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Kids,
  Container as Kids,
  Component as KidsComponent,
};
