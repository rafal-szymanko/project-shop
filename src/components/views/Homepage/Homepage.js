import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { BestsellerSummary } from '../../features/BestsellerSummary/BestsellerSummary';
import {Baner} from '../../features/Baner/Baner';

import { connect } from 'react-redux';
import { getAllKits, fetchBestsellerKits } from '../../../redux/kitsRedux';
import { getAllBooks, fetchBestsellerBooks } from '../../../redux/booksRedux';
import { getAllForKids, fetchBestsellerForKids } from '../../../redux/kidsRedux';
import { getAllAccesories, fetchBestsellerAccesories } from '../../../redux/accesoriesRedux';

import styles from './Homepage.module.scss';

import PhoneIcon from '@material-ui/icons/Phone';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

import {isNotEmpty} from '../../../utils/checkIfObjNotEmpty';

const Component = ({className, children, kits, books, kids, accessories, fetchKits, fetchBooks, fetchForKids, fetchAccesories}) => {

  useEffect(() => {fetchKits();}, [fetchKits]);
  useEffect(() => {fetchBooks();}, [fetchBooks]);
  useEffect(() => {fetchForKids();}, [fetchForKids]);
  useEffect(() => {fetchAccesories();}, [fetchAccesories]);

  return(
    <div className={clsx(className, styles.root)}>
      {children}
      <Baner/>
      <div className={styles.container}>
        <div>
          <h2 className={styles.title}>Bestsellers</h2>
        </div>
        <div className={styles.items}>
          {isNotEmpty(kits) ? kits.map(kit => <BestsellerSummary key={kit._id} {...kit}/>) : null}
          {isNotEmpty(books) ? books.map(book => <BestsellerSummary key={book._id} {...book}/>) : null}
          {isNotEmpty(kids) ? kids.map(kid => <BestsellerSummary key={kid._id} {...kid}/>) : null}
          {isNotEmpty(accessories) ? accessories.map(accessory => <BestsellerSummary key={accessory._id} {...accessory}/>) : null}
        </div>
      </div>
      <div className={styles.container}>
        <div>
          <h2 className={styles.title}>Discover Manchester United Store</h2>
        </div>
        <div className={styles.items}>
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
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  kits: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  books: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  kids: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  accessories: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  fetchKits: PropTypes.func,
  fetchBooks: PropTypes.func,
  fetchForKids: PropTypes.func,
  fetchAccesories: PropTypes.func,
};

const mapStateToProps = state => ({
  kits: getAllKits(state),
  books: getAllBooks(state),
  kids: getAllForKids(state),
  accessories: getAllAccesories(state),
});

const mapDispatchToProps = dispatch => ({
  fetchKits: () => dispatch(fetchBestsellerKits()),
  fetchBooks: () => dispatch(fetchBestsellerBooks()),
  fetchForKids: () => dispatch(fetchBestsellerForKids()),
  fetchAccesories: () => dispatch(fetchBestsellerAccesories()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);


export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
