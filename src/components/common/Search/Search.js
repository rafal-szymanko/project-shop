import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import {useLocation} from 'react-router-dom';

import { connect } from 'react-redux';
import {changeSearchPhrase} from '../../../redux/filtersRedux';

import styles from './Search.module.scss';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const Component = ({className, searchPhrase}) => {
  const location  = useLocation();

  const handleOnChange = (event) => {
    searchPhrase(event.target.value);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <SearchIcon/>
      {/* <TextField id="standard-basic" label="Find product" onChange={handleOnChange}/> */}
    </div>
  );
};


Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};


const mapDispatchToProps = dispatch => ({
  searchPhrase: (value) => dispatch(changeSearchPhrase(value)),

});

const Container = connect(null, mapDispatchToProps)(Component);


export {
  Container as Search,
  Component as SearchComponent,
};
