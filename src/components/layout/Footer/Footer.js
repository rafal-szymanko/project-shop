import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import {Link} from 'react-router-dom';

import {NewsletterForm} from '../../features/NewsletterForm/NewsletterForm';


import styles from './Footer.module.scss';

const Component = ({className, children}) => {
  return(
    <div className={clsx(className, styles.root)}>
      <div>
        <div className={styles.logo}>
          <h2>MU Store Ltd</h2>
        </div>
        <p>Greengate,</p>
        <p>Manchester,</p>
        <p>United Kingdom,</p>
        <p>M24 1FD,</p>
        <p>Phone: +44 (0) 333 014 4543</p>
      </div>
      <div className={styles.sitemap}>
        <div className={styles.sitemapContainer}>
          <h2>Sitemap</h2>
          <Link to='/all'>All Products</Link>
          <Link to='/kits'>Kits</Link>
          <Link to='/kids'>Kids</Link>
          <Link to='/books'>Books</Link>
          <Link to='/accessories'>Gifts & Accessories</Link>
        </div>
      </div>
      <div className={styles.newsletter}>
        <h2>Newsletter</h2>
        <p> Do you want to receive exclusive emails with discounts and product information?</p>
        <NewsletterForm/>
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
// const mapStateToProps = (state) => ({

// });


// const mapDispatchToProps = (dispatch, props) => ({
//   addToNewsletter: (data) => dispatch(addPostRequest(data)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Footer,
  // Container as Footer,
  Component as FooterComponent,
};
