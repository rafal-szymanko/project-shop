import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { BestsellerSummary } from '../../features/BestsellerSummary/BestsellerSummary';

import { connect } from 'react-redux';
import {getAllItemsForKids, fetchForKids} from '../../../redux/productsRedux';

import styles from './Kids.module.scss';

import {isNotEmpty} from '../../../utils/checkIfObjNotEmpty';


const Component = ({className, children, forKids, fetchAllItemsForKids}) => {

  useEffect(() => {fetchAllItemsForKids();}, [fetchAllItemsForKids]); 

  return(
    <div className={clsx(className, styles.root)}>
      <div className={styles.items}>
        {isNotEmpty(forKids.data) ? forKids.data.map(kit => <BestsellerSummary key={kit._id} {...kit}/>) : null}
      </div>
    </div>
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
