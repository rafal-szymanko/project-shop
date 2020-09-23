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

import './styles/global.scss';


const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/kits' component={Kits}/>
          <Route exact path='/gifts' component={GiftsAndAccesories}/>
          <Route exact path='/kids' component={Kids}/>
          <Route exact path='/books' component={Books}/>
          <Route path='*' component={NotFound} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  </Provider>
);

export { App };
