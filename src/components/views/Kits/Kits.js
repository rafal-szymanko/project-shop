import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { BestsellerSummary } from '../../features/BestsellerSummary/BestsellerSummary';

import { connect } from 'react-redux';
import {getAllKits, fetchKits} from '../../../redux/productsRedux';

import styles from './Kits.module.scss';

import {isNotEmpty} from '../../../utils/checkIfObjNotEmpty';


const Component = ({className, children, kits, fetchAllKits}) => {


  useEffect(() => {fetchAllKits();}, [fetchAllKits]); 

  return(
    <div className={clsx(className, styles.root)}>
      <div className={styles.items}>
        {isNotEmpty(kits.data) ? kits.data.map(kit => <BestsellerSummary key={kit._id} {...kit}/>) : null}
      </div>
    </div>
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
