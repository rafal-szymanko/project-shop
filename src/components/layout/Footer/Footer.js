import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import {Link} from 'react-router-dom';

import {NewsletterForm} from '../../features/NewsletterForm/NewsletterForm';


import styles from './Footer.module.scss';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const Component = ({className}) => {
  return(
    <div className={clsx(className, styles.root)}>
      <div className={styles.address}>
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
      <div className={styles.socialMedia}>
        <p>Visit us on our social media</p>
        <div className={styles.icons}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FacebookIcon/>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <TwitterIcon/>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramIcon/>
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <YouTubeIcon/>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon/>
          </a>
        </div>
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as Footer,
  Component as FooterComponent,
};
