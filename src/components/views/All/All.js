import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { BestsellerSummary } from '../../features/BestsellerSummary/BestsellerSummary';

import { connect } from 'react-redux';
import {getAll, fetchAll} from '../../../redux/productsRedux';

import styles from './All.module.scss';

import {isNotEmpty} from '../../../utils/checkIfObjNotEmpty';


const Component = ({className, children, allProducts, fetchAllItems}) => {


  useEffect(() => {fetchAllItems();}, [fetchAllItems]); 

  const {kids, kits, accessories, books} = allProducts;

  return(
    <div className={clsx(className, styles.root)}>
      <div className={styles.items}>
        {isNotEmpty(kits.data) ? kits.data.map(kit => <BestsellerSummary key={kit._id} {...kit}/>) : null}
        {isNotEmpty(books.data) ? books.data.map(book => <BestsellerSummary key={book._id} {...book}/>) : null}
        {isNotEmpty(kids.data) ? kids.data.map(kid => <BestsellerSummary key={kid._id} {...kid}/>) : null}
        {isNotEmpty(accessories.data) ? accessories.data.map(accessory => <BestsellerSummary key={accessory._id} {...accessory}/>) : null}
      </div>
    </div>
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
