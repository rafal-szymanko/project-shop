import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import {ItemSummary} from '../../features/ItemSummary/ItemSummary';
import { Footer } from '../../layout/Footer/Footer';

import { connect } from 'react-redux';
import {fetchBooks, getAllBooks} from '../../../redux/productsRedux';

import styles from './Books.module.scss';
import {motion} from 'framer-motion';
import {pageTransition, pageVariants} from '../../../motion/pageTransition';

import {isNotEmpty} from '../../../utils/checkIfObjNotEmpty';


const Component = ({className, children, books, fetchAllBooks}) => {

  useEffect(() => {fetchAllBooks();}, [fetchAllBooks]); 

  return(
    <motion.div className={clsx(className, styles.root)} initial={pageVariants.initial} animate={pageVariants.in} exit={pageVariants.out} transition={pageTransition}>
      <div className={styles.items}>
        {isNotEmpty(books.data) ? books.data.map(kit => <ItemSummary key={kit._id} {...kit}/>) : null}
      </div>
      <Footer/>
    </motion.div>
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
