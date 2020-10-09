import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import {Header} from '../Header/Header';

import styles from './MainLayout.module.scss';

const Component = ({className, children}) => {

  return (
    <div className={clsx(className, styles.root)}>
      <Header/>
      {children}
    </div>
  );
};



Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as MainLayout,
  Component as MainLayoutComponent,
};
