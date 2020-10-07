import React from 'react';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import {Location} from './components/layout/Location/Location';

import './styles/global.scss';


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <Location/>
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
};


export { App };
