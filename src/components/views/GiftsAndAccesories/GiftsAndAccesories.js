import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import {ItemSummary} from '../../features/ItemSummary/ItemSummary';

import { connect } from 'react-redux';
import {fetchAccessories, getAllAccessories} from '../../../redux/productsRedux';

import styles from './GiftsAndAccesories.module.scss';

import {isNotEmpty} from '../../../utils/checkIfObjNotEmpty';


const Component = ({className, children, accessories, fetchAllAccessories}) => {

  useEffect(() => {fetchAllAccessories();}, [fetchAllAccessories]); 

  return(
    <div className={clsx(className, styles.root)}>
      <div className={styles.items}>
        {isNotEmpty(accessories.data) ? accessories.data.map(kit => <ItemSummary key={kit._id} {...kit}/>) : null}
      </div>
    </div>
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
