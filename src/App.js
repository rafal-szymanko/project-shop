import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import {Kits} from './components/views/Kits/Kits';
import {GiftsAndAccesories} from './components/views/GiftsAndAccesories/GiftsAndAccesories';
import {Kids} from './components/views/Kids/Kids';
import {Books} from './components/views/Books/Books';
import { NotFound } from './components/views/NotFound/NotFound';
import { All } from './components/views/All/All';
import {ProductSummary} from './components/views/ProductSummary/ProductSummary';
import {Cart} from './components/views/Cart/Cart';
import {Order} from './components/views/Order/Order';

import './styles/global.scss';


const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainLayout>
        <Switch>
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
      </MainLayout>
    </BrowserRouter>
  </Provider>
);

export { App };
