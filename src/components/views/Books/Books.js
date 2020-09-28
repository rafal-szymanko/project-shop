import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import {ItemSummary} from '../../features/ItemSummary/ItemSummary';

import { connect } from 'react-redux';
import {fetchBooks, getAllBooks} from '../../../redux/productsRedux';

import styles from './Books.module.scss';

import {isNotEmpty} from '../../../utils/checkIfObjNotEmpty';


const Component = ({className, children, books, fetchAllBooks}) => {

  useEffect(() => {fetchAllBooks();}, [fetchAllBooks]); 

  return(
    <div className={clsx(className, styles.root)}>
      <div className={styles.items}>
        {isNotEmpty(books.data) ? books.data.map(kit => <ItemSummary key={kit._id} {...kit}/>) : null}
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fetchAllBooks: PropTypes.func,
  books: PropTypes.object,
};

const mapStateToProps = state => ({
  books: getAllBooks(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAllBooks: () => dispatch(fetchBooks()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Books,
  Container as Books,
  Component as BooksComponent,
};
