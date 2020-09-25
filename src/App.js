import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { All } from './components/views/All/All';
import {Kits} from './components/views/Kits/Kits';
import {Kit} from './components/views/Kit/Kit';
import {GiftsAndAccesories} from './components/views/GiftsAndAccesories/GiftsAndAccesories';
import {Accessory} from './components/views/Accessory/Accessory';
import {Kids} from './components/views/Kids/Kids';
import {Books} from './components/views/Books/Books';
import {Book} from './components/views/Book/Book';
import { NotFound } from './components/views/NotFound/NotFound';

import './styles/global.scss';


const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/all' component={All} />
          <Route exact path='/kits' component={Kits}/>
          <Route exact path='/kits/:id' component={Kit}/>
          <Route exact path='/accessories' component={GiftsAndAccesories}/>
          <Route exact path='/accessories/:id' component={Accessory}/>
          <Route exact path='/kids' component={Kids}/>
          <Route exact path='/kids/:id' component={Kids}/>
          <Route exact path='/books' component={Books}/>
          <Route exact path='/books/:id' component={Book}/>
          <Route path='*' component={NotFound} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  </Provider>
);

export { App };
