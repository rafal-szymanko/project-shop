import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';

import Carousel from 'react-material-ui-carousel';
import {Paper} from '@material-ui/core';
import img1 from '../../../image/1.png';
import img2 from '../../../image/2.png';
import img3 from '../../../image/3.png';

const Component = ({className, children}) => {

  var items = [
    {
      name: 'Random Name #1',
      description: 'Probably the most random thing you have ever seen!',
      img: img1,
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!',
      img: img2,
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!',
      img: img3,
    },
  ];

  return(
    <div className={clsx(className, styles.root)}>
      {children}
      <Carousel animation={'slide'}>
        {items.map((item, i) => <Paper key={styles.img} className={styles.paper}><img alt={'banner'} className={styles.image}src={item.img}></img></Paper>)}
      </Carousel>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Homepage,
  // Container as Homepage,
  Component as HomepageComponent,
};
