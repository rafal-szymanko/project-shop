import React from 'react';
import PropTypes from 'prop-types';

import {Switch, Route, useLocation} from 'react-router-dom';


import { Homepage } from '../../views/Homepage/Homepage';
import {Kits} from '../../views/Kits/Kits';
import {GiftsAndAccesories} from '../../views/GiftsAndAccesories/GiftsAndAccesories';
import {Kids} from '../../views/Kids/Kids';
import {Books} from '../../views/Books/Books';
import { NotFound } from '../../views/NotFound/NotFound';
import { All } from '../../views/All/All';
import {ProductSummary} from '../../views/ProductSummary/ProductSummary';
import {Cart} from '../../views/Cart/Cart';
import {Order} from '../../views/Order/Order';

import {AnimatePresence} from 'framer-motion';

const Component = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Switch location={location} key={location.pathname}>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/kits' component={Kits}/>
        <Route exact path='/kits/:id' component={ProductSummary}/>
        <Route exact path='/all' component={All}/>
        <Route exact path='/accessories' component={GiftsAndAccesories}/>
        <Route exact path='/accessories/:id' component={ProductSummary}/>
        <Route exact path='/kids' component={Kids}/>
        <Route exact path='/kids/:id' component={ProductSummary}/>
        <Route exact path='/books' component={Books}/>
        <Route exact path='/books/:id' component={ProductSummary}/>
        <Route exact path='/books/:id' component={ProductSummary}/>
        <Route exact path='/cart' component={Cart}/>
        <Route exact path='/cart/order' component={Order}/>
        <Route path='*' component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as Location,
  Component as LocationComponent,
};
