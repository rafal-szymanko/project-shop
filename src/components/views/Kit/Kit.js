import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import {getKitById, fetchKit} from '../../../redux/productRedux';

import styles from './Kit.module.scss';
import CardMedia from '@material-ui/core/CardMedia';

import {isNotEmpty} from '../../../utils/checkIfObjNotEmpty';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';




const Component = ({className, children, kit, fetchKitById}) => {

  const [fetchedKit, setFetchedKit] = useState({});
  useEffect(() => {fetchKitById();}, [fetchKitById]);
  useEffect(() => {if(isNotEmpty(kit)) {setFetchedKit(...kit);}}, [kit]);

  const handleClick = (event) => {
    console.log(event.target.textContent);
  };

  return (
    <div className={clsx(className, styles.root)}>
      {isNotEmpty(fetchedKit) ? 
        <div className={styles.details}>
          <CardMedia
            className={styles.media}
            component="img"
            alt={fetchedKit.image}
            image={`http://localhost:8000/images/${fetchedKit.image}`}
            title={fetchedKit.image}
          />
          <div className={styles.description}>
            <h2>{fetchedKit.name}</h2>
            <h2> Your price: {fetchedKit.price.toFixed(2)}</h2>
            <form className={styles.form}>
              <InputLabel htmlFor="age-native-simple">Size</InputLabel>
              <Select
                native
                // value={state.age}
                // onChange={handleChange}
                inputProps={{
                  name: 'size',
                  id: 'size-native-simple',
                }}
              >
                {fetchedKit.size.map(item=> <option key={item} value={item}>{item}</option>)}
              </Select>
              <TextField id="standard-basic" label="Quantity" />
              <Button className={styles.button} variant="contained" type="submit">add to cart</Button>
            </form>
            <ul className={styles.detailsList}>
              <h3 className={styles.detailsHeader}>Details</h3>
              {fetchedKit.details.map(detail => <li className={styles.detailsItem} key={detail}>{detail}</li>)}
            </ul>
            <div className={styles.detailsList}>
              <h3 className={styles.detailsHeader}>Description</h3>
              {fetchedKit.description}
            </div>
          </div>
        </div>

        : null
      }
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  kit: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  fetchKitById: PropTypes.func,
};

const mapStateToProps = state => ({
  kit: getKitById(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchKitById: () => dispatch(fetchKit(props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Kit,
  Container as Kit,
  Component as KitComponent,
};
