import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import {ItemSummary} from '../../features/ItemSummary/ItemSummary';
import { Footer } from '../../layout/Footer/Footer';

import { connect } from 'react-redux';
import {getAllKits, fetchKits} from '../../../redux/productsRedux';

import styles from './Kits.module.scss';
import {motion} from 'framer-motion';
import {pageTransition, pageVariants} from '../../../motion/pageTransition';

import {isNotEmpty} from '../../../utils/checkIfObjNotEmpty';


const Component = ({className, children, kits, fetchAllKits}) => {
  
  useEffect(() => {fetchAllKits();}, [fetchAllKits]); 

  return(
    <motion.div className={clsx(className, styles.root)} initial={pageVariants.initial} animate={pageVariants.in} exit={pageVariants.out} transition={pageTransition}>
      <div className={styles.items}>
        {isNotEmpty(kits.data) ? kits.data.map(kit => <ItemSummary key={kit._id} {...kit}/>) : null}
      </div>
      <Footer/>
    </motion.div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fetchAllKits: PropTypes.func,
  kits: PropTypes.object,
};

const mapStateToProps = state => ({
  kits: getAllKits(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAllKits: () => dispatch(fetchKits()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Kits,
  Container as Kits,
  Component as KitsComponent,
};
