import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import {Link} from 'react-router-dom';

import styles from './ItemSummary.module.scss';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';



const Component = ({className, name, price, image, section, _id}) => {

  return(
    <div className={clsx(className, styles.root)}>
      <Link to={`/${section}/${_id}`}>
        <Card className={styles.card}>
          <CardMedia
            className={styles.media}
            image={`http://localhost:8000/images/${image}`}
          />
          <CardContent className={styles.content}>
            <Typography
              className={styles.header}
              variant={'h6'}
              gutterBottom
            >
              {name}
            </Typography>
            <Typography
              className={styles.subheader}
              variant={'caption'}
            >
             Price: {price} €
            </Typography>
            <Divider className={styles.divider} light />
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  section: PropTypes.string,
  _id: PropTypes.string,
};

export {
  Component as ItemSummary,
  // Container as ItemSummary,
  Component as ItemSummaryComponent,
};
