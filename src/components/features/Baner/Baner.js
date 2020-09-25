import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAllBanners, fetchAllBanners } from '../../../redux/bannersRedux';

import styles from './Baner.module.scss';
import Carousel from 'react-material-ui-carousel';
import {Paper} from '@material-ui/core';

import {isNotEmpty} from '../../../utils/checkIfObjNotEmpty';


const Component = ({className, banners, fetchBanners}) => {

  useEffect(() => {fetchBanners();}, [fetchBanners]);

  return (
    <div className={clsx(className, styles.root)}>
      <Carousel animation={'slide'}>
        {isNotEmpty(banners) ? banners.map(banner => <Paper key={banner._id} className={styles.paper}><img alt={banner.alt} className={styles.image}src={`http://localhost:8000/images/${banner.image}`}></img></Paper>) : null}
        {/* {items.map((item, i) => <Paper key={styles.img} className={styles.paper}><img alt={'banner'} className={styles.image}src={item.img}></img></Paper>)} */}
      </Carousel>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fetchBanners: PropTypes.func,
  banners: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const mapStateToProps = state => ({
  banners: getAllBanners(state),
});

const mapDispatchToProps = dispatch => ({
  fetchBanners: () => dispatch(fetchAllBanners()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Baner,
  Container as Baner,
  Component as BanerComponent,
};
